import express from 'express';
import { validateRequest } from '../middlewares/validate-request-middleware';

import { authenticate } from '../middlewares/authenticate-middleware';
import createBookingTypeController, { CreateBookingTypeModel } from '../controllers/booking/create-booking-type';
import getAllBookingTypesController from '../controllers/booking/get-all-booking-types';
import { CreateBookingRequestModel } from '../controllers/booking/create-booking/create-booking-request-model';
import createBookingController from '../controllers/booking/create-booking';
import getAllBookingsController from '../controllers/booking/get-all-bookings';
import createAddonController, { CreateAddonRequestModel } from '../controllers/booking/create-addon';
import getAllAddonsController from '../controllers/booking/get-all-addons';
import { UpdateBookingTypeRequestModel } from '../controllers/booking/update-booking-type/update-booking-type-request-model';
import updateBookingTypeController from '../controllers/booking/update-booking-type';
import createFrameBookingController, { CreateFrameBookingRequestModel } from '../controllers/booking/create-frame-booking';
import { CancelFrameBookingRequestModel } from '../controllers/booking/cancel-frame-booking/cancel-frame-booking-request-model';
import cancelFrameBookingController from '../controllers/booking/cancel-frame-booking';
import getAllFrameBookingsController from '../controllers/booking/get-all-frame-bookings';
import deleteBookingController from '../controllers/booking/delete-booking';
import updateBookingController, { UpdateBookingRequestModel } from '../controllers/booking/update-booking';
import autoCreateBookingsFromFrameBookingsController from '../controllers/booking/auto-create-bookings-from-frame-bookings';
import { GetAvailableTimeSlotsRequestModel } from '../controllers/booking/get-available-time-slots/get-available-time-slots-request.model';
import getAvailableTimeSlotsController from '../controllers/booking/get-available-time-slots';
import { GetAvailableTimeSlotsRequestBodyModel } from '../controllers/booking/get-available-time-slots/get-available-time-slots-request.body.model';
import markBookingAsCompletedController from '../controllers/booking/mark-booking-as-completed';
import { CancelBookingRequestModel } from '../controllers/booking/cancel-booking/cancel-booking-request-model';
import cancelBookingController from '../controllers/booking/cancel-booking';
import addAddonsToBookingController, { AddAddonsToBookingRequestModel } from '../controllers/booking/add-addons-to-booking';
import editFrameBookingController from '../controllers/booking/edit-frame-booking';
import { EditFrameBookingRequestModel, EditFrameBookingRequestPathModel } from '../controllers/booking/edit-frame-booking/request-model';

const app = express.Router();

app.post('/booking-type', validateRequest(CreateBookingTypeModel), authenticate(), createBookingTypeController);
app.get('/booking-type', getAllBookingTypesController);
app.put('/booking-type', validateRequest(UpdateBookingTypeRequestModel), authenticate(), updateBookingTypeController);

app.post('/', validateRequest(CreateBookingRequestModel), authenticate(), createBookingController);
app.get('/', authenticate(), getAllBookingsController);
app.delete('/:bookingId', authenticate(), deleteBookingController);
app.put('/:bookingId', validateRequest(UpdateBookingRequestModel), authenticate(), updateBookingController);

app.post('/addon', validateRequest(CreateAddonRequestModel), authenticate(), createAddonController);
app.get('/addon', getAllAddonsController);

app.post('/frame-booking', validateRequest(CreateFrameBookingRequestModel), authenticate(), createFrameBookingController);
app.get('/frame-booking', authenticate(), getAllFrameBookingsController);
app.patch('/frame-booking/:frameBookingId', authenticate(), validateRequest(EditFrameBookingRequestPathModel, 'params'), validateRequest(EditFrameBookingRequestModel), editFrameBookingController);

app.put('/frame-booking/cancel/:frameBookingId', validateRequest(CancelFrameBookingRequestModel, 'params'), authenticate(), cancelFrameBookingController);

app.post('/auto-create-bookings-from-frame-bookings', autoCreateBookingsFromFrameBookingsController);

app.post('/:bookingId/addons', validateRequest(AddAddonsToBookingRequestModel), authenticate(), addAddonsToBookingController);

app.post('/available-time-slots/:durationInMinutes', validateRequest(GetAvailableTimeSlotsRequestModel, 'params'), validateRequest(GetAvailableTimeSlotsRequestBodyModel), getAvailableTimeSlotsController);

app.put('/complete/:bookingId', authenticate(), markBookingAsCompletedController);

app.patch('/cancel/:bookingId', validateRequest(CancelBookingRequestModel, 'params'), authenticate(), cancelBookingController);

export default app;
