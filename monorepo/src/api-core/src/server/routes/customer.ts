import express from 'express';
import { validateRequest } from '../middlewares/validate-request-middleware';

import createCustomerController, { CreateCustomerRequestModel } from '../controllers/customer/create-customer';
import getAllCosumersController from '../controllers/customer/get-all-customers';
import { authenticate } from '../middlewares/authenticate-middleware';
import addAddressController, { AddAddressRequestModel } from '../controllers/customer/add-address';
import createCustomerAndLoginController from '../controllers/customer/create-customer-and-login';
import { GetCustomerRequestModel } from '../controllers/customer/get-customer/get-customer-request-model';
import getCustomerController from '../controllers/customer/get-customer';
import { EditCustomerAddressParamsRequestModel } from '../controllers/customer/edit-customer-address/param-request-model';
import { EditCustomerBodyRequestModel } from '../controllers/customer/edit-customer-address/body-request-model';
import editCustomerAddressController from '../controllers/customer/edit-customer-address';

const app = express.Router();

app.post('/', validateRequest(CreateCustomerRequestModel), createCustomerController);
app.post('/create-customer-and-login', validateRequest(CreateCustomerRequestModel), createCustomerAndLoginController);

app.get('/', authenticate(), getAllCosumersController);

app.post('/add-address/:customerId', validateRequest(AddAddressRequestModel), authenticate(), addAddressController);

app.get('/:customerId', authenticate(), validateRequest(GetCustomerRequestModel, 'params'), getCustomerController);

app.patch('/address/:customerAddressId', validateRequest(EditCustomerAddressParamsRequestModel, 'params'), validateRequest(EditCustomerBodyRequestModel), authenticate(), editCustomerAddressController);

export default app;
