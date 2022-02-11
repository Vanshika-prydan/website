import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AddonModel } from '../models/addon';
import { AvailableTimeSlotModel } from '../models/available-time-slot';
import { BookingModel } from '../models/booking';
import { BookingTypeModel } from '../models/booking-type';
import { CustomerModel } from '../models/customer';
import { AddCustomerAddressRequestPayload, CreateBookingRequestPayload, CreateCustomerRequestPayload, CreateFrameBookingRequestPayload, Mode, UpdateBookingRequestPayload } from './types';

import validator from 'validator';
import { Occurrence, OccurrenceType } from '../definitions/Occurrence';
import { JWTResponseModel } from '../models/jwt-response';
import { CreateCustomerAndLoginResponseModel } from '../models/create-customer-and-login-response';
import { FrameBookingModel } from '../models/frame-booking';
import { CreditCardModel } from '../models/credit-card';
import RecursivePartial from '../helpers/recursive-partial';
import { CustomerAddressModel } from '../models/customer-address';

export class ApiService {
    private axios: AxiosInstance;

    constructor (mode:Mode) {
      let baseURL = '';
      if (mode === 'local') baseURL = 'localhost:8080';
      if (mode === 'development') baseURL = 'https://test.cleangreen.se';
      if (mode === 'staging') baseURL = 'https://api-staging.cleangreen.se';
      if (mode === 'production') baseURL = 'https://api.cleangreen.se';

      this.axios = axios.create({
        baseURL: baseURL,
        withCredentials: true,
      });
    }

    public setResponseInterceptor (
      success: (
          res: AxiosResponse
        ) => AxiosResponse<any> | Promise<AxiosResponse<any>>,
      error: (res: AxiosError) => any,
    ) {
      return this.axios.interceptors.response.use(success, error);
    }

    public setBearerToken (token:string):void {
      this.axios.defaults.headers.Authorization = `Bearer: ${token}`;
    }

    public unsetBearerToken ():void {
      delete this.axios.defaults.headers.Authorization;
    }

    public sendRequest (config: AxiosRequestConfig): Promise<any> {
      return axios(config);
    }

    public unsetResponseInterceptor (interceptor: number) {
      this.axios.interceptors.response.eject(interceptor);
    }

    private async post <ResponseModel> (url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<ResponseModel> {
      try {
        return (await this.axios.post(url, data)).data;
      } catch (e) {
        throw e.response?.data ?? e;
      }
    }

    private async get<ResponseModel> (url: string, config?: AxiosRequestConfig | undefined): Promise<ResponseModel> {
      try {
        return (await this.axios.get(url, config)).data;
      } catch (e) {
        throw e.response?.data ?? e;
      }
    }

    private async delete<ResponseModel> (url: string, config?: AxiosRequestConfig | undefined): Promise<ResponseModel> {
      try {
        return (await this.axios.delete(url, config)).data;
      } catch (e) {
        throw e.response?.data ?? e;
      }
    }

    private async request<ResponseModel> (config: AxiosRequestConfig): Promise<ResponseModel> {
      try {
        return (await this.axios.request(config)).data;
      } catch (e) {
        throw e.response?.data ?? e;
      }
    }

    private async put<ResponseModel> (url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<ResponseModel> {
      try {
        return (await this.axios.put(url, data, config)).data;
      } catch (e) {
        throw e.response?.data ?? e;
      }
    }

    private async patch<ResponseModel> (url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<ResponseModel> {
      try {
        return (await this.axios.patch(url, data, config)).data;
      } catch (e) {
        throw e.response?.data ?? e;
      }
    }

    public async createCustomer (data: CreateCustomerRequestPayload): Promise<CustomerModel> {
      return this.post<CustomerModel>('/customer', data);
    }

    public async fetchAllBookingTypes (): Promise<BookingTypeModel[]> {
      return this.get<BookingTypeModel[]>('/booking/booking-type');
    }

    public async fetchAllAddons (): Promise<AddonModel[]> {
      return this.get('/booking/addon');
    }

    public async createBooking (data: CreateBookingRequestPayload): Promise<BookingModel> {
      return this.post<BookingModel>('/booking', data);
    }

    public async createFrameBooking (data: CreateFrameBookingRequestPayload): Promise<FrameBookingModel> {
      return this.post('/booking/frame-booking', data);
    }

    public async addCustomerAddress (data: AddCustomerAddressRequestPayload, customerId: string): Promise<CustomerModel> {
      return this.post(`/customer/add-address/${customerId}`, data);
    }

    public async getAvailableTimeSlots (durationInMinutes: number, occurrence: OccurrenceType = Occurrence.ONETIME):Promise<AvailableTimeSlotModel[]> {
      return this.post<AvailableTimeSlotModel[]>(`/booking/available-time-slots/${validator.escape(durationInMinutes.toString())}`, { occurrence });
    }

    public async jwtLogin (email:string, password: string):Promise<JWTResponseModel> {
      return this.post<JWTResponseModel>('/iam/jwt-login', { email, password });
    }

    public async jwtRefreshToken (refreshToken:string):Promise<JWTResponseModel> {
      return this.post<JWTResponseModel>('/iam/jwt-refresh-token', { refreshToken });
    }

    public async createCustomerAndLogin (data:CreateCustomerRequestPayload): Promise<CreateCustomerAndLoginResponseModel> {
      return this.post<CreateCustomerAndLoginResponseModel>('/customer/create-customer-and-login', data);
    }

    public async saveCardIntent ():Promise<{secret:string}> {
      return this.post('/payment/card');
    }

    public async fetchAllBookings (): Promise<BookingModel[]> {
      return this.get('/booking');
    }

    public async fetchAllFrameBookings (): Promise<FrameBookingModel[]> {
      return this.get('/booking/frame-booking');
    }

    public async markBookingAsCompleted (bookingId:string):Promise<BookingModel> {
      return this.put(`/booking/complete/${bookingId}`);
    }

    public async appendToWaitingList (payload:{email: string, postalCode: string }): Promise<void> {
      return this.post('/waiting-list', payload);
    }

    public async getAllCreditCards ():Promise<CreditCardModel[]> {
      return this.get('/payment/card');
    }

    public async deleteCreditCard (cardId: string):Promise<void> {
      return this.delete(`/payment/card/${cardId}`);
    }

    public async cancelBooking (bookingId: string): Promise<void> {
      return this.patch(`/booking/cancel/${bookingId}`);
    }

    public async forgottenPassword (email: string): Promise<void> {
      return this.post('/iam/forgotten-password', { email });
    }

    public async confirmForgottenPassword (data:{email: string, password: string, code: string}): Promise<void> {
      return this.post('/iam/forgotten-password/confirm', data);
    }

    public async changePassword (data:{oldPassword: string, newPassword: string}): Promise<void> {
      return this.patch('/iam/password', data);
    }

    public async updateBooking (bookingId: string, data:UpdateBookingRequestPayload): Promise<BookingModel> {
      return this.put(`/booking/${bookingId}`, data);
    }

    public async registerDevice (token:string):Promise<void> {
      return this.post('/account/device', { token });
    }

    public async setDefaultPaymentMethod (cardId:string):Promise<void> {
      return this.post(
      `/payment/default-card/${cardId}`,
      );
    }

    public async getCustomer (customerId:string):Promise<CustomerModel> {
      return this.get(`/customer/${customerId}`);
    }

    public async getCustomers (): Promise<CustomerModel[]> {
      return this.get('/customer');
    }

    public async editCustomerAddress (customerAddressId:string, fieldsToUpdate: RecursivePartial<CustomerAddressModel>) {
      return this.patch(`/customer/address/${customerAddressId}`, fieldsToUpdate);
    }
}
