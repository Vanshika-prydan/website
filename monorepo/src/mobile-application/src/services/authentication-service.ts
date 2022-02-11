import store from '../store';
import { login, update, logout } from '../store/authentication';
import apiService from './api-service';
import * as SecureStore from 'expo-secure-store';
import { CreateCustomerRequestPayload } from './api-service/types';
import { CreateCustomerAndLoginResponseModel } from '../models/create-customer-and-login-response.model';
import { JWTResponseModel } from '../models/jwt-response.model';
import PushNotifications from '../utils/push-notifications';

export default class AuthenticationService {
  private static tokenIsRefreshing = false;
  private static pausedRequests: Promise<any>[] = [];

  private static refreshInterceptor: number | undefined;

  public static async onLoad (): Promise<void> {
    console.log('App is loading');
    if ((await SecureStore.getItemAsync('IS_AUTHENTICATED')) === 'TRUE') {
      console.log('Is authenticated, downloading token');
      await AuthenticationService.refreshTokenAndSaveDataToStore();
      await AuthenticationService.setTokenRefreshInterceptor();
      await new PushNotifications().register();
    } else AuthenticationService.logout();
  }

  private static async refreshTokenAndSaveDataToStore () {
    const refreshToken = await SecureStore.getItemAsync('REFRESH_TOKEN');
    if (!refreshToken) return;
    try {
      const response = await apiService.jwtRefreshToken(refreshToken);
      apiService.setBearerToken(response.accessToken);
      await SecureStore.setItemAsync('REFRESH_TOKEN', response.refreshToken);
      store.dispatch(update(response));
      console.log('New token is downloaded and saved');
      return response;
    } catch (e) {
      apiService.unsetBearerToken();
      await SecureStore.deleteItemAsync('IS_AUTHENTICATED');
      await SecureStore.deleteItemAsync('REFRESH_TOKEN');
      console.log('Logging out');
      store.dispatch(logout());
    }
  }

  public static async login (params: {
    email: string;
    password: string;
  }): Promise<JWTResponseModel> {
    const response = await apiService.jwtLogin(params);
    console.log(response);

    if (!response.account.roles.map((r) => r.name).includes('CUSTOMER')) {
      throw new Error('Du måste ha ett kundkonto för att kunna logga in');
    }

    await SecureStore.setItemAsync('IS_AUTHENTICATED', 'TRUE');
    await SecureStore.setItemAsync('REFRESH_TOKEN', response.refreshToken);
    apiService.setBearerToken(response.accessToken);
    new PushNotifications().register();
    AuthenticationService.setTokenRefreshInterceptor();

    store.dispatch(login(response));
    return response;
  }

  public static async createCustomerAndLogin (
    payload: CreateCustomerRequestPayload
  ): Promise<CreateCustomerAndLoginResponseModel> {
    const response = await apiService.createCustomerAndLogin(payload);
    apiService.setBearerToken(response.accessToken);
    new PushNotifications().register();
    await SecureStore.setItemAsync('IS_AUTHENTICATED', 'TRUE');
    await SecureStore.setItemAsync('REFRESH_TOKEN', response.refreshToken);

    AuthenticationService.setTokenRefreshInterceptor();
    const storePayload: JWTResponseModel = {
      account: response.customer.account,
      permissions: response.permissions,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };

    store.dispatch(login(storePayload));
    return response;
  }

  private static setTokenRefreshInterceptor () {
    console.log('SETTING REFRESH TOKEN');
    AuthenticationService.refreshInterceptor =
      apiService.setResponseInterceptor(
        (res) => res,
        async (error) => {
          if (
            error.response?.status === 401 &&
            error.response?.data?.errorCode === 'TOKEN_EXPIRED'
          ) {
            console.log('TOKEN HAS EXPIRED');
            AuthenticationService.unsetTokenRefreshInterceptor();
            const tokens = await this.refreshTokenAndSaveDataToStore();
            AuthenticationService.setTokenRefreshInterceptor();
            return apiService.sendRequest({
              ...error.response.config,
              headers: { Authorization: `Bearer ${tokens?.accessToken}` },
            });
          } else return Promise.reject(error);
        }
      );
  }

  private static unsetTokenRefreshInterceptor () {
    if (AuthenticationService.refreshInterceptor) {
      apiService.unsetResponseInterceptor(
        AuthenticationService.refreshInterceptor
      );
    }
    AuthenticationService.refreshInterceptor = undefined;
  }

  public static async logout (): Promise<void> {
    SecureStore.deleteItemAsync('IS_AUTHENTICATED');
    SecureStore.deleteItemAsync('REFRESH_TOKEN');
    store.dispatch(logout());
  }
}
