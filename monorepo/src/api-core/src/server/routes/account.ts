import express from 'express';
// import { validateRequest } from '../middlewares/validate-request-middleware';

import { authenticate } from '../middlewares/authenticate-middleware';
import getAllRolesController from '../controllers/account/roles/get-all-roles';
import { validateRequest } from '../middlewares/validate-request-middleware';
import { EditAccountRequestModel } from '../controllers/account/edit-account/edit-account-request-model';
import editAccountController from '../controllers/account/edit-account';
import { RegisterDeviceRequestModel } from '../controllers/account/register-device/request-model';
import registerDeviceController from '../controllers/account/register-device';
import fetchAllAccountsController from '../controllers/account/fetch-all-accounts';

const app = express.Router();

app.put('/', validateRequest(EditAccountRequestModel), authenticate(), editAccountController);
app.get('/', authenticate(), fetchAllAccountsController);

app.get('/role', authenticate(), getAllRolesController);

app.post('/device', validateRequest(RegisterDeviceRequestModel), authenticate(), registerDeviceController);

export default app;
