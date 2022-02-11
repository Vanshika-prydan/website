import express from 'express';
import { validateRequest } from '../middlewares/validate-request-middleware';

import { authenticate } from '../middlewares/authenticate-middleware';
import getAllEmployeesController from '../controllers/employee/get-all-employees';
import createEmployeeController, { CreateEmployeeRequestModel } from '../controllers/employee/create-employee';
import setAvailabilityController, { SetDefaultEmployeeAvailabilityParamsRequestModel, SetDefaultEmployeeAvailabilityRequestModel } from '../controllers/employee/default-availability/set-availability';
import getAvailabilityController, { GetDefaultEmployeeAvailabilityParamsRequestModel } from '../controllers/employee/default-availability/get-availability';

const app = express.Router();

app.post('/', authenticate(), validateRequest(CreateEmployeeRequestModel), createEmployeeController);

app.get('/', authenticate(), getAllEmployeesController);

app.put('/:employeeId/default-availability', authenticate(), validateRequest(SetDefaultEmployeeAvailabilityParamsRequestModel, 'params'), validateRequest(SetDefaultEmployeeAvailabilityRequestModel), setAvailabilityController);
app.get('/:employeeId/default-availability', authenticate(), validateRequest(GetDefaultEmployeeAvailabilityParamsRequestModel, 'params'), getAvailabilityController);

export default app;
