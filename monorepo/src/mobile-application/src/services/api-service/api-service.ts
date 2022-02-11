import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { API_URL } from '@env';
import { AvailableTimeSlotModel } from '@models/available-time-slot';
import { CreateCustomerAndLoginResponseModel } from '@models/create-customer-and-login-response.model';
import { FrameBookingModel } from '@models/frame-booking.model';
import { JWTResponseModel } from '@models/jwt-response.model';
import validator from 'validator';
import { AddonModel } from '@models/addon.model';
import { BookingTypeModel } from '@models/booking-type.model';
import { BookingModel } from '@models/booking.model';
import { CustomerModel } from '@models/customer.model';

import {
  CreateCustomerRequestPayload,
  CreateBookingRequestPayload,
  AddCustomerAddressRequestPayload,
  OccurrenceType,
  Occurrence,
  CreateFrameBookingRequestPayload,
  UpdateBookingRequestPayload,
} from './types';
import { CreditCardModel } from '@models/credit-card.model';
import { CustomerAddressModel } from '@models/customer-address.model';
import RecursivePartial from '@utils/recursive-partial';

class ApiService {
  private static instance: ApiService;

  private readonly BASE_URL = API_URL; // 'http://localhost:8080'; // */ 'https://test.cleangreen.se';

  private axios: AxiosInstance;

  private constructor () {
    this.axios = axios.create({
      baseURL: this.BASE_URL,
      withCredentials: true,
    });
  }

  public static setResponseInterceptor (
    success: (
      res: AxiosResponse
    ) => AxiosResponse<any> | Promise<AxiosResponse<any>>,
    error: (res: AxiosError) => any
  ): number {
    return ApiService.instance.axios.interceptors.response.use(success, error);
  }

  public static sendRequest (config: AxiosRequestConfig): Promise<any> {
    return axios(config);
  }

  public static unsetResponseInterceptor (interceptor: number) {
    ApiService.instance.axios.interceptors.response.eject(interceptor);
  }

  public static getInstance (): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public static async createCustomer (
    data: CreateCustomerRequestPayload
  ): Promise<CustomerModel> {
    try {
      return (await ApiService.getInstance().axios.post('/customer', data))
        .data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static setBearerToken (token: string): void {
    ApiService.getInstance().axios.defaults.headers.Authorization = `Bearer: ${token}`;
  }

  public static unsetBearerToken (): void {
    delete ApiService.getInstance().axios.defaults.headers.Authorization;
  }

  public static async fetchAllBookingTypes (): Promise<BookingTypeModel[]> {
    try {
      return (await ApiService.getInstance().axios.get('/booking/booking-type'))
        .data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async fetchAllAddons (): Promise<AddonModel[]> {
    try {
      return (await ApiService.getInstance().axios.get('/booking/addon')).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async createBooking (
    data: CreateBookingRequestPayload
  ): Promise<BookingModel> {
    try {
      return (await ApiService.getInstance().axios.post('/booking', data)).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async addCustomerAddress (
    data: AddCustomerAddressRequestPayload,
    customerId: string
  ): Promise<CustomerModel> {
    try {
      return (
        await ApiService.getInstance().axios.post(
          `/customer/add-address/${customerId}`,
          data
        )
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async getAvailableTimeSlots (
    durationInMinutes: number,
    occurrence: OccurrenceType = Occurrence.ONETIME
  ): Promise<AvailableTimeSlotModel[]> {
    try {
      return (
        await ApiService.getInstance().axios.post(
          `/booking/available-time-slots/${validator.escape(
            durationInMinutes.toString()
          )}`,
          { occurrence }
        )
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async jwtRefreshToken (
    refreshToken: string
  ): Promise<JWTResponseModel> {
    try {
      return (
        await ApiService.getInstance().axios.post<JWTResponseModel>(
          '/iam/jwt-refresh-token',
          { refreshToken }
        )
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async createCustomerAndLogin (
    data: CreateCustomerRequestPayload
  ): Promise<CreateCustomerAndLoginResponseModel> {
    try {
      return (
        await ApiService.getInstance().axios.post<CreateCustomerAndLoginResponseModel>(
          '/customer/create-customer-and-login',
          data
        )
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async createFrameBooking (
    data: CreateFrameBookingRequestPayload
  ): Promise<FrameBookingModel> {
    try {
      return (
        await ApiService.getInstance().axios.post(
          '/booking/frame-booking',
          data
        )
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async saveCardIntent (): Promise<{ secret: string }> {
    try {
      return (await ApiService.getInstance().axios.post('/payment/card')).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async fetchAllBookings (): Promise<BookingModel[]> {
    try {
      return (await ApiService.getInstance().axios.get('/booking')).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async fetchAllFrameBookings (): Promise<FrameBookingModel[]> {
    try {
      return (
        await ApiService.getInstance().axios.get('/booking/frame-booking')
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async jwtLogin (data: {
    email: string;
    password: string;
  }): Promise<JWTResponseModel> {
    try {
      return (await ApiService.getInstance().axios.post('/iam/jwt-login', data))
        .data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async appendToWaitingList (data: {
    email: string;
    postalCode: string;
  }): Promise<void> {
    try {
      return (await ApiService.getInstance().axios.post('/waiting-list', data))
        .data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async getAllCreditCards (): Promise<CreditCardModel[]> {
    try {
      return (await ApiService.getInstance().axios.get('/payment/card')).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async deleteCreditCard (cardId: string): Promise<void> {
    try {
      return (
        await ApiService.getInstance().axios.delete(`/payment/card/${cardId}`)
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async cancelBooking (bookingId: string): Promise<void> {
    try {
      return (
        await ApiService.getInstance().axios.patch(
          `/booking/cancel/${bookingId}`
        )
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async forgottenPassword (email: string): Promise<void> {
    try {
      return (
        await ApiService.getInstance().axios.post('/iam/forgotten-password', {
          email,
        })
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async confirmForgottenPassword (data: {
    email: string;
    password: string;
    code: string;
  }): Promise<void> {
    try {
      return (
        await ApiService.getInstance().axios.post(
          '/iam/forgotten-password/confirm',
          data
        )
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async changePassword (data: {
    oldPassword: string;
    newPassword: string;
  }): Promise<void> {
    try {
      return (await ApiService.getInstance().axios.patch('/iam/password', data))
        .data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async updateBooking (
    bookingId: string,
    data: UpdateBookingRequestPayload
  ): Promise<BookingModel> {
    try {
      return (
        await ApiService.getInstance().axios.put(`/booking/${bookingId}`, data)
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async registerDevice (token: string): Promise<void> {
    try {
      return (
        await ApiService.getInstance().axios.post('/account/device', { token })
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async setDefaultPaymentMethod (cardId: string): Promise<void> {
    try {
      return (
        await ApiService.getInstance().axios.post(
          `/payment/default-card/${cardId}`
        )
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async getCustomer (customerId: string): Promise<CustomerModel> {
    try {
      return (
        await ApiService.getInstance().axios.get(`/customer/${customerId}`)
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async getCustomers (): Promise<CustomerModel[]> {
    try {
      return (await ApiService.getInstance().axios.get('/customer')).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }

  public static async editCustomerAddress (
    customerAddressId: string,
    fieldsToUpdate: RecursivePartial<CustomerAddressModel>
  ): Promise<void> {
    try {
      return (
        await ApiService.getInstance().axios.patch(
          `/customer/address/${customerAddressId}`,
          fieldsToUpdate
        )
      ).data;
    } catch (e) {
      throw e.response?.data ?? e;
    }
  }
}

export default ApiService;
