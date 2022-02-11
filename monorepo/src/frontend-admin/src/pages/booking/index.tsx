import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { fetchAllBookings } from '../../store/booking';
import { CalendarEvent, Resource, SelectEvent } from './calendar';
import BookingPresenter, { BookingPresenterProps } from './presenter';
import { fetchAllEmployees } from '../../store/employee';
import { EmployeeModel } from '../../models/employee.model';

const Booking = () => {
  const permissions = useSelector((state: RootState) => state.auth.permissions);

  const [createBookingIsOpen, setCreateBookingIsOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<EmployeeModel[]>(
    []
  );
  const [createBookingStartTime, setCreateBookingStartTime] = useState<
    undefined | Date
  >();
  const [createBookingEmployee, setCreateBookingEmployee] = useState<
    undefined | EmployeeModel
  >();
  const [
    createBookingDurationInMinutes,
    setCreateBookingDurationInMinutes,
  ] = useState<undefined | number>();

  const bookings = useSelector(
    (state: RootState) => state.booking.bookings
  ).filter((b) => !b.cancelledAt);
  const employees = useSelector((state: RootState) => state.employee.employees);
  const dispatch = useDispatch();

  if (!permissions) return null;

  const resetInitialCreateBookingValues = () => {
    setCreateBookingEmployee(undefined);
    setCreateBookingStartTime(undefined);
    setCreateBookingDurationInMinutes(undefined);
  };

  const fetchBookings = () => dispatch(fetchAllBookings());
  const fetchEmployees = () => dispatch(fetchAllEmployees());

  const onCreateBookingClose = () => {
    setCreateBookingIsOpen(false);
    resetInitialCreateBookingValues();
    fetchBookings();
    fetchEmployees();
  };

  const bookingEvents = (): CalendarEvent[] =>
    bookings
      .filter((b) => !b.cancelledAt)
      .map((b) => ({
        title: `${b.bookingType.name}`,
        start: new Date(b.startTime),
        end: new Date(b.endTime),
        allDay: false,
        booking: b,
        resourceId: b.employee.employeeId,
      }));

  const resources = (): Resource[] => {
    const e = selectedEmployees.length > 0 ? selectedEmployees : employees;
    return e.map((em) => ({
      resourceId: em.employeeId,
      title: `${em.account.firstName} ${em.account.lastName}`,
    }));
  };

  const onSelectBookingSlot = (slot: SelectEvent): void => {
    if (slot.action !== 'select') return;
    setCreateBookingStartTime(new Date(slot.start));
    setCreateBookingEmployee(
      employees.find((e) => e.employeeId === slot.resourceId)
    );
    const MS_TO_MINUTES = 60 * 1000;
    const durationInMinutes =
      (new Date(slot.end).getTime() - new Date(slot.start).getTime()) /
      MS_TO_MINUTES;
    setCreateBookingDurationInMinutes(durationInMinutes);
    setCreateBookingIsOpen(true);
  };

  useEffect(() => {
    fetchBookings();
    fetchEmployees();
  }, []);

  const presenterProps: BookingPresenterProps = {
    setCreateBookingIsOpen,
    createBookingIsOpen,
    onCreateBookingClose,
    bookingEvents: bookingEvents(),
    resources: resources(),
    selectedEmployees,
    setSelectedEmployees,
    employees,
    createBookingStartTime,
    createBookingEmployee,
    onSelectBookingSlot,
    createBookingDurationInMinutes,
    permissions,
  };

  return <BookingPresenter {...presenterProps} />;
};

export default Booking;
