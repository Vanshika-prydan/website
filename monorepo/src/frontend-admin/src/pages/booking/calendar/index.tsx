import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import './calendar-style.css';

import { enUS } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import { BookingModel } from '../../../models/booking.model';
import DetailsView from './details-view';
import ApiService from '../../../services/api-service';
import { fetchAllBookings } from '../../../store/booking';
import { generateErrorMessage } from '../../../utils/generate-error-message';
import { ErrorModel } from '../../../models/error.model';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales: { enUS },
});

export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resourceId?: any;
  booking: BookingModel;
}
export interface Resource {
  resourceId: string;
  title: string;
}

export interface BookingsProps {
  bookingEvents: CalendarEvent[];
  resources?: Resource[];
  // eslint-disable-next-line no-unused-vars
  onSelectSlot?(slotInfo: SelectEvent): void;
}

export interface SelectEvent {
  start: Date | string;
  end: Date | string;
  slots: Date[] | string[];
  action: 'select' | 'click' | 'doubleClick';
  resourceId?: string;
}

const Bookings = ({
  bookingEvents,
  resources,
  onSelectSlot,
}: BookingsProps) => {
  const [selectedBooking, setSelectedBooking] = useState<
    BookingModel | undefined
  >(undefined);

  const dispatch = useDispatch();

  const onDeleteBooking = async (bookingId: string) => {
    try {
      await ApiService.deleteBooking(bookingId);
      onCloseBooking();
    } catch (e) {
      alert(
        `Could not delete the customer  ${
          generateErrorMessage(e as ErrorModel) ?? 'UNKNOWN_ERROR'
        }`
      );
    }
  };

  const onCloseBooking = () => {
    setSelectedBooking(undefined);
    dispatch(fetchAllBookings());
  };

  const onPressCompleted = async (bookingId: string) => {
    try {
      await ApiService.markBookingAsCompleted(bookingId);
      onCloseBooking();
    } catch (e) {
      alert(generateErrorMessage(e as ErrorModel));
    }
  };

  return (
    <div>
      <Calendar
        selectable
        localizer={localizer}
        views={['month', 'week', 'work_week', 'day']}
        defaultView="day"
        events={bookingEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, minHeight: 600 }}
        onSelectEvent={(e) => setSelectedBooking(e.booking)}
        resources={resources}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="title"
        onSelectSlot={onSelectSlot}
      />
      {selectedBooking ? (
        <DetailsView
          booking={selectedBooking}
          onClose={onCloseBooking}
          onDelete={onDeleteBooking}
          onPressCompleted={onPressCompleted}
        />
      ) : null}
    </div>
  );
};

export default Bookings;
