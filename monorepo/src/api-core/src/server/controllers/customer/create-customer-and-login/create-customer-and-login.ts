import { NextFunction, Response, Request } from 'express';
import CreateCustomer from '../../../../domain/interactors/customer/create-customer';
import { AccountService } from '../../../../domain/services/account-service';
import TokenService from '../../../../services/token-service';
import { CreateCustomerAndLoginResponseModel } from '../../../models/create-customer-and-login-response.model';
import { CustomerDTO } from '../../../models/customer.model';

export const buildCreateCustomerAndLoginController = (createCustomer: CreateCustomer) => async (req:Request, res:Response, next:NextFunction) => {
  try {
    const createdCustomer = await createCustomer.execute({ payload: req.body });

    const accessToken = TokenService.createAndSignAccessToken(createdCustomer.account);
    const refreshToken = TokenService.createSignedRefreshToken(createdCustomer.account);

    const response: CreateCustomerAndLoginResponseModel = {
      permissions: AccountService.getPermissionsFromAccount(createdCustomer.account),
      accessToken,
      refreshToken,
      customer: new CustomerDTO(createdCustomer),
    };
    return res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};
