
import express, { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '../../domain/entities/ErrorCode';
import chargeUnpaidBookingsController from '../controllers/services/charge-unpaid-bookings';
import employeeEmailerController from '../controllers/services/employee-emailer';
import sendUpcomingBookingNotificationsController from '../controllers/services/send-upcoming-booking-notifications';
const app = express.Router();

const authenticateServiceToken = async (req: Request, res: Response, next: NextFunction) => {
  // deepcode ignore HardcodedNonCryptoSecret: <please specify a reason of ignoring this>
  const authKey = 'ko4tkorgTOK%YWEF_T%KH!hjkro%&ÅES#rgklowreGKERO3h';
  if (req.headers?.authorization !== authKey) next(new Error(ErrorCode.ACCESS_DENIED));
  return next();
};

app.post('/employee-emailer', authenticateServiceToken, employeeEmailerController);
app.post('/send-upcoming-booking-notifications', authenticateServiceToken, sendUpcomingBookingNotificationsController);
app.post('/charge-unpayed-bookings', authenticateServiceToken, chargeUnpaidBookingsController);
app.post('/charge-unpaid-bookings', authenticateServiceToken, chargeUnpaidBookingsController);

export default app;
