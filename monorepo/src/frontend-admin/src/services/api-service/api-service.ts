/* eslint-disable no-unused-vars */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { AccountModel } from '../../models/account.model';
import { AddonModel } from '../../models/addon.model';
import { BookingTypeModel } from '../../models/booking-type.model';
import { BookingModel } from '../../models/booking.model';
import { CustomerModel } from '../../models/customer.model';
import { DefaultEmployeeAvailability } from '../../models/employee-default-availability';
import { EmployeeModel } from '../../models/employee.model';
import { FrameBookingModel } from '../../models/frame-booking.model';
import { LoginResponseModel } from '../../models/login-response.model';
import { RoleModel } from '../../models/role.model';
import {
  CreateEmployeeRequestPayload,
  CreateCustomerRequestPayload,
  CreateBookingRequestPayload,
  AddCustomerAddressRequestPayload,
  CreateFrameBookingRequestPayload,
  EditAccountRequestPayload,
  UpdateBookingRequestPayload,
  SetAvailabilityRequestPayload,
  EditFrameBookingRequestPayload,
} from './types';

class ApiService {
  private static instance: ApiService;

  private readonly BASE_URL = process.env.REACT_APP_API_URL;

  private axios: AxiosInstance;

  private constructor() {
    this.axios = axios.create({
      baseURL: this.BASE_URL,
      withCredentials: true,
    });
  }

  public static setResponseInterceptor(
    success: (
      res: AxiosResponse
    ) => AxiosResponse<any> | Promise<AxiosResponse<any>>,
    error: (res: AxiosError) => any
  ) {
    return ApiService.instance.axios.interceptors.response.use(success, error);
  }

  public static sendRequest(config: AxiosRequestConfig): Promise<any> {
    return axios(config);
  }

  public static unsetResponseInterceptor(interceptor: number) {
    ApiService.instance.axios.interceptors.response.eject(interceptor);
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private static async post<ResponseModel>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ): Promise<ResponseModel> {
    try {
      return (await ApiService.getInstance().axios.post(url, data)).data;
    } catch (e) {
      throw (e as AxiosError).response?.data ?? e;
    }
  }

  private static async get<ResponseModel>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<ResponseModel> {
    try {
      return (await ApiService.getInstance().axios.get(url, config)).data;
    } catch (e) {
      throw (e as AxiosError).response?.data ?? e;
    }
  }

  private static async delete<ResponseModel>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<ResponseModel> {
    try {
      return (await ApiService.getInstance().axios.delete(url, config)).data;
    } catch (e) {
      throw (e as AxiosError).response?.data ?? e;
    }
  }

  private static async request<ResponseModel>(
    config: AxiosRequestConfig
  ): Promise<ResponseModel> {
    try {
      return (await ApiService.getInstance().axios.request(config)).data;
    } catch (e) {
      throw (e as AxiosError).response?.data ?? e;
    }
  }

  private static async put<ResponseModel>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ): Promise<ResponseModel> {
    try {
      return (await ApiService.getInstance().axios.put(url, data, config)).data;
    } catch (e) {
      throw (e as AxiosError).response?.data ?? e;
    }
  }

  private static async patch<ResponseModel>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ): Promise<ResponseModel> {
    try {
      return (await ApiService.getInstance().axios.patch(url, data, config))
        .data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      throw (e as AxiosError).response?.data ?? e;
    }
  }

  public static async login(params: {
    email: string;
    password: string;
  }): Promise<LoginResponseModel> {
    return ApiService.post('/iam/login', params);
  }

  public static async editAccount(
    data: EditAccountRequestPayload
  ): Promise<AccountModel> {
    return ApiService.put('/account', data);
  }

  public static async refreshToken(): Promise<LoginResponseModel> {
    return ApiService.post('/iam/refresh-token');
  }

  public static async createEmployee(
    data: CreateEmployeeRequestPayload
  ): Promise<EmployeeModel> {
    return ApiService.post('/employee', data);
  }

  public static async createCustomer(
    data: CreateCustomerRequestPayload
  ): Promise<CustomerModel> {
    return ApiService.post('/customer', data);
  }

  public static async fetchAllEmployees(): Promise<EmployeeModel[]> {
    return ApiService.get('/employee');
  }

  public static async fetchAllRoles(): Promise<RoleModel[]> {
    return ApiService.get('/account/role');
  }

  public static async fetchAllBookingTypes(): Promise<BookingTypeModel[]> {
    return ApiService.get('/booking/booking-type');
  }

  public static async fetchAllAddons(): Promise<AddonModel[]> {
    return ApiService.get('/booking/addon');
  }

  public static async fetchAllCustomers(): Promise<CustomerModel[]> {
    return ApiService.get('/customer');
  }

  public static async fetchAllBookings(): Promise<BookingModel[]> {
    return ApiService.get('/booking');
  }

  public static async fetchAllFrameBookings(): Promise<FrameBookingModel[]> {
    return ApiService.get('/booking/frame-booking');
  }

  public static async createBooking(
    data: CreateBookingRequestPayload
  ): Promise<BookingModel> {
    return ApiService.post('/booking', data);
  }

  public static async deleteBooking(bookingId: string): Promise<void> {
    return ApiService.delete(`/booking/${bookingId}`);
  }

  public static async addCustomerAddress(
    data: AddCustomerAddressRequestPayload,
    customerId: string
  ): Promise<CustomerModel> {
    return ApiService.post(`/customer/add-address/${customerId}`, data);
  }

  public static async addBookingType(data: {
    name: string;
    description: string;
  }): Promise<BookingTypeModel> {
    return ApiService.post('/booking/booking-type', data);
  }

  public static async addAddonService(data: {
    name: string;
    defaultTimeInMinutes: string;
    description: string;
  }): Promise<AddonModel> {
    return ApiService.post('/booking/addon', data);
  }

  public static async cancelFrameBooking(
    frameBookingId: string,
    endTime?: Date
  ): Promise<void> {
    return ApiService.put(`/booking/frame-booking/cancel/${frameBookingId}`);
  }

  public static async createFrameBooking(
    data: CreateFrameBookingRequestPayload
  ): Promise<FrameBookingModel> {
    return ApiService.post('/booking/frame-booking', data);
  }

  public static async updateBooking(
    bookingId: string,
    payload: UpdateBookingRequestPayload
  ): Promise<BookingModel> {
    return ApiService.put(`/booking/${bookingId}`, payload);
  }

  public static async markBookingAsCompleted(
    bookingId: string
  ): Promise<BookingModel> {
    return ApiService.put(`/booking/complete/${bookingId}`);
  }

  public static async getDefaultEmployeeAvailability(
    employeeId: string
  ): Promise<DefaultEmployeeAvailability[]> {
    return ApiService.get(`/employee/${employeeId}/default-availability`);
  }

  public static async setDefaultEmployeeAvailability(
    employeeId: string,
    availability: SetAvailabilityRequestPayload[]
  ): Promise<DefaultEmployeeAvailability[]> {
    return ApiService.put(`/employee/${employeeId}/default-availability`, {
      availability,
    });
  }

  public static async fetchAllAccounts(): Promise<AccountModel[]> {
    return ApiService.get('/account');
  }

  public static async editFrameBooking({
    frameBookingId,
    employeeId,
  }: EditFrameBookingRequestPayload): Promise<FrameBookingModel> {
    return ApiService.patch(`/booking/frame-booking/${frameBookingId}`, {
      employeeId,
    });
  }
}

export default ApiService;
