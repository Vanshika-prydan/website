/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddressModel } from '../../../models/address.model';
import { BookingTypeModel } from '../../../models/booking-type.model';
import { EmployeeModel } from '../../../models/employee.model';
import ApiService from '../../../services/api-service';
import { UpdateBookingRequestPayload } from '../../../services/api-service/types';
import { fetchAllBookings } from '../../../store/booking';
import { RootState } from '../../../store/rootReducer';
import { generateErrorMessage } from '../../../utils/generate-error-message';
import EditBookingPresenter from './presenter';
import { EditBookingProps } from './types';

const EditBooking = ({ booking, onUpdate }: EditBookingProps) => {
  const bookingTypes = useSelector((state: RootState) => state.bookingType.bookingTypes);
  const employees = useSelector((state: RootState) => state.employee.employees);
  const dispatch = useDispatch();
  const [bookingType, setBookingType] = useState<BookingTypeModel | null>(
    booking.bookingType
  );
  const [address, setAddress] = useState<AddressModel | null>(booking.address);
  const initialEmployee = employees.find(
    (e) => e.employeeId === booking.employee.employeeId
  );
  if (!initialEmployee) return null;
  const [employee, setEmployee] = useState<EmployeeModel | null>(
    initialEmployee
  );

  const [specialInstructions, setSpecialInstructions] = useState(
    booking.specialInstructions ?? ''
  );

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const updateBooking = async () => {
    const payload: UpdateBookingRequestPayload = {
      bookingTypeId: bookingType?.bookingTypeId ?? undefined,
      employeeId: employee?.employeeId ?? undefined,
      addressId: address?.addressId ?? undefined,
      specialInstructions: specialInstructions.trim(),
    };
    setIsLoading(true);
    try {
      await ApiService.updateBooking(booking.bookingId, payload);
      dispatch(fetchAllBookings());
      setIsLoading(false);
      setIsOpen(false);
      if (onUpdate) onUpdate();
    } catch (e) {
      setIsLoading(false);
      setErrorMessage(generateErrorMessage(e));
    }
  };
  const close = () => {
    setIsOpen(false);
  };

  const addresses = booking.customer.addresses
    ? booking.customer.addresses.map((a) => a.address)
    : [];
  return (
    <EditBookingPresenter
      {...{
        setIsOpen,
        isOpen,
        booking,
        bookingType,
        bookingTypes,
        setBookingType,
        address,
        addresses,
        setAddress,
        updateBooking,
        employee,
        employees,
        setEmployee,
        specialInstructions,
        setSpecialInstructions,
        close,
        isLoading,
        errorMessage,
        initialEmployee,
      }}
    />
  );
};

export default EditBooking;
