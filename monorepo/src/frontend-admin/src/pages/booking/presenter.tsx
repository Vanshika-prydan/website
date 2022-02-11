/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Divider } from '@material-ui/core';
import Bookings, { CalendarEvent, Resource, SelectEvent } from './calendar';
import CreateBooking from './create-booking';
import AddButton from '../../components/add-button';
import PermissionRequired from '../../components/permission-required';
import PageTitle from '../../components/page-title';
import { EmployeeModel } from '../../models/employee.model';
import SelectEmployees from './select-employees';
import Permission from '../../../../api-core/src/domain/entities/Permission';

export interface BookingPresenterProps {
  createBookingIsOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setCreateBookingIsOpen(val: boolean): void;
  onCreateBookingClose(): void;
  bookingEvents: CalendarEvent[];
  resources: Resource[];
  selectedEmployees: EmployeeModel[];
  // eslint-disable-next-line no-unused-vars
  setSelectedEmployees(employees: EmployeeModel[]): void;
  employees: EmployeeModel[];
  // eslint-disable-next-line no-unused-vars
  onSelectBookingSlot(slot: SelectEvent): void;
  createBookingStartTime?: Date;
  createBookingEmployee?: EmployeeModel;
  createBookingDurationInMinutes?: number;
  permissions: Permission[];
}

const BookingPresenter = (props: BookingPresenterProps) => (
  <div>
    <PageTitle title="Bookings">
      <PermissionRequired permission="BOOKING_ADD_BOOKING_TO_CUSTOMER">
        <AddButton
          data-test="ADD_BOOKING_BUTTON"
          variant="contained"
          onClick={() => props.setCreateBookingIsOpen(true)}
        >
          NEW BOOKING
        </AddButton>
      </PermissionRequired>
    </PageTitle>
    <Divider />
    <PermissionRequired permission="BOOKING_LIST_ALL_BOOKINGS">
      <SelectEmployees
        employees={props.employees}
        onSelect={props.setSelectedEmployees}
        initialSelected={props.selectedEmployees}
      />
    </PermissionRequired>
    <Bookings
      bookingEvents={props.bookingEvents}
      {...(Object.values(props.permissions as string[]).includes(
        'EMPLOYEE_LIST_ALL'
      )
        ? { resources: props.resources }
        : undefined)}
      onSelectSlot={props.onSelectBookingSlot}
    />
    {props.createBookingIsOpen ? (
      <CreateBooking
        isOpen
        onClose={props.onCreateBookingClose}
        employee={props.createBookingEmployee}
        startTime={props.createBookingStartTime}
        durationInMinutes={props.createBookingDurationInMinutes}
      />
    ) : null}
  </div>
);

export default BookingPresenter;
