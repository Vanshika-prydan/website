import { NextFunction, Request, Response } from 'express';
import SendUpcomingBookingNotificationUseCase from '../../../../domain/interactors/services/upcoming-booking-notification';

const buildSendUpcomingBookingNotificationsController = (upcomingBookingNotificationFacade: SendUpcomingBookingNotificationUseCase) => async (req:Request, res:Response, next: NextFunction) => {
  try {
    // @ts-ignore
    await upcomingBookingNotificationFacade.execute();
    return res.status(200).json({ status: 'success' });
  } catch (e) {
    next(e);
  }
};

export default buildSendUpcomingBookingNotificationsController;
