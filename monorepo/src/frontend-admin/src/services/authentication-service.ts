import { LoginResponseModel } from '../models/login-response.model';
import store from '../store';
import { login, update, logout } from '../store/auth';
import ApiService from './api-service';

export default class AuthenticationService {
  private static refreshInterceptor: number | undefined;

  public static async onLoad() {
    if (localStorage.getItem('IS_AUTHENTICATED') === 'TRUE') {
      await AuthenticationService.refreshTokenAndSaveDataToStore();
      await AuthenticationService.setTokenRefreshInterceptor();
    }
  }

  private static async refreshTokenAndSaveDataToStore() {
    try {
      const response = await ApiService.refreshToken();
      store.dispatch(update(response));
    } catch (e) {
      localStorage.removeItem('IS_AUTHENTICATED');
      store.dispatch(logout());
      window.location.href = '/login';
    }
  }

  public static async login(params: {
    email: string;
    password: string;
  }): Promise<LoginResponseModel> {
    const payload = await ApiService.login(params);
    AuthenticationService.setTokenRefreshInterceptor();
    localStorage.setItem('IS_AUTHENTICATED', 'TRUE');
    store.dispatch(login(payload));
    return payload;
  }

  private static setTokenRefreshInterceptor() {
    AuthenticationService.refreshInterceptor = ApiService.setResponseInterceptor(
      (res) => res,
      async (error) => {
        if (
          error.response?.status === 401 &&
          error.response?.data?.errorCode === 'TOKEN_EXPIRED'
        ) {
          AuthenticationService.unsetTokenRefreshInterceptor();
          await AuthenticationService.refreshTokenAndSaveDataToStore();
          AuthenticationService.setTokenRefreshInterceptor();
          return ApiService.sendRequest(error.response.config);
        }
        return Promise.reject(error);
      }
    );
  }

  private static unsetTokenRefreshInterceptor() {
    if (AuthenticationService.refreshInterceptor) {
      ApiService.unsetResponseInterceptor(
        AuthenticationService.refreshInterceptor
      );
    }
    AuthenticationService.refreshInterceptor = undefined;
  }
}
