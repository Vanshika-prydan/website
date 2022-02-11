import { NextFunction, Response, Request } from 'express';
import { ErrorCode } from '../domain/entities/ErrorCode';
import TokenService from '../services/token-service';
export default class ControllerTest {
    request = { accountId: 'uuid', body: {} } as unknown as Request;
    response = {
      status: jest.fn(() => this.response),
      json: jest.fn(() => this.response),
      cookie: jest.fn(() => this.response),
      send: jest.fn(() => this.response),
    } as unknown as Response;

     next = jest.fn() as unknown as NextFunction;

    resolveUseCase = <T>(resolveValue:any = {}) => ({
      execute: jest.fn(() => Promise.resolve(resolveValue)),
    } as unknown as T);

    rejectUseCase = <T>(errorCode:ErrorCode | string = '') => ({
      execute: jest.fn(() => Promise.reject(new Error(errorCode))),
    } as unknown as T);

    TokenService = (employeeId = 'employeeId') => ({ getEmployeeIdFromRequest: jest.fn(() => employeeId) } as unknown as typeof TokenService);
}
