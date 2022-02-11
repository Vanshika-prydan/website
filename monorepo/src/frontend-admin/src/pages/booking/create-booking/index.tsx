/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { AddonModel } from '../../../models/addon.model';
import { AddressModel } from '../../../models/address.model';
import { BookingTypeModel } from '../../../models/booking-type.model';
import { BookingModel } from '../../../models/booking.model';
import { CustomerModel } from '../../../models/customer.model';
import { EmployeeModel } from '../../../models/employee.model';
import { FrameBookingModel } from '../../../models/frame-booking.model';
import ApiService from '../../../services/api-service';
import {
  CreateBookingRequestPayload,
  CreateFrameBookingRequestPayload,
} from '../../../services/api-service/types';
import { fetchAllAddons } from '../../../store/addon';
import { fetchAllBookingTypes } from '../../../store/booking-type';
import { fetchAllCustomers } from '../../../store/customer';
import { fetchAllEmployees } from '../../../store/employee';
import { RootState } from '../../../store/rootReducer';
import { generateErrorMessage } from '../../../utils/generate-error-message';
import { calculatePresetTimeInMinutes } from './logic';
import Presenter, { PresenterProps } from './Presenter';
import { CreateBookingProps, Occurrence } from './types';

const CreateBooking = (props: CreateBookingProps) => {
  const { onClose, isOpen } = props;

  /** ***************************************************************************
   *
   */
  const [customer, setCustomer] = useState<CustomerModel | null>(null);
  const [address, setAddress] = useState<AddressModel | null>(null);
  const [employee, setEmployee] = useState<EmployeeModel | null>(
    props.employee ?? null
  );
  const [bookingType, setBookingType] = useState<BookingTypeModel | null>(null);
  const [startTime, setStartTime] = useState<Date>(
    props.startTime ?? new Date()
  );
  const [durationInMinutes, setDurationInMinutes] = useState<string>(
    props.durationInMinutes?.toString() ?? ''
  );
  const [selectedAddons, setSelectedAddons] = useState<AddonModel[]>([]);
  const [isFrameBooking, setIsFrameBooking] = useState(false);
  const [frameBookingEndDate, setFrameBookingEndDate] = useState<
    Date | undefined
  >();
  const [occurrence, setOccurrence] = useState<Occurrence>('weekly');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [privateNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /** ***************************************************************************
   *
   */
  const customers = useSelector((state: RootState) => state.customer.customers);
  const employees = useSelector((state: RootState) => state.employee.employees);
  const bookingTypes = useSelector(
    (state: RootState) => state.bookingType.bookingTypes
  );
  const allAddons = useSelector((state: RootState) => state.addon.addons);

  /** ***************************************************************************
   *
   */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllAddons());
    dispatch(fetchAllBookingTypes());
    dispatch(fetchAllEmployees());
    dispatch(fetchAllCustomers());
  }, []);

  /** ******************************************************************* */

  const close = () => {
    onClose();
  };

  const validateInputOrFail = (): void => {
    if (!customer?.customerId) throw new Error('No customer is selected');
    if (startTime.getTime() <= Date.now()) {
      throw new Error('The selected time must be after now');
    }
    const correctDuration =
      validator.isInt(durationInMinutes.toString()) ||
      Number(durationInMinutes) <= 0;
    if (!correctDuration) {
      throw new Error('The duration must be a positive number');
    }
    if (!bookingType?.bookingTypeId) {
      throw new Error('No booking type is selected');
    }

    if (isFrameBooking) {
      if (
        frameBookingEndDate &&
        (frameBookingEndDate.getTime() <= Date.now() ||
          frameBookingEndDate.getTime() < startTime.getTime())
      ) {
        throw new Error(
          'The end time must be after today and the selected start time'
        );
      }
    }
  };

  const onSubmit = () => {
    try {
      validateInputOrFail();
    } catch (e) {
      setErrorMessage((e as Error).message);
      return;
    }
    create();
  };

  const availableAddresses = (): AddressModel[] =>
    customer?.addresses?.map((a) => a.address) ?? [];

  const createBooking = async (): Promise<BookingModel> =>
    ApiService.createBooking(getPayload());

  const getPayload = (): CreateBookingRequestPayload &
    CreateFrameBookingRequestPayload => ({
    occurrence,
    endTime: frameBookingEndDate,
    customerId: customer?.customerId ?? '',
    startTime: startTime || new Date(),
    durationInMinutes: Number(durationInMinutes),
    addressId: address?.addressId ?? '',
    privateNotes,
    specialInstructions,
    bookingTypeId: bookingType?.bookingTypeId ?? '',
    employeeId: employee?.employeeId ?? '',
    bookingAddons: selectedAddons.map((addon) => ({
      addonId: addon.addonId,
      numberOfUnits: 1,
    })),
  });

  const createFrameBooking = (): Promise<FrameBookingModel> =>
    ApiService.createFrameBooking(getPayload());

  const create = async () => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (isFrameBooking) await createFrameBooking();
      else await createBooking();
      close();
    } catch (e) {
      setErrorMessage(generateErrorMessage(e));
      setIsLoading(false);
    }
  };

  const availableAddons = (): AddonModel[] =>
    allAddons.filter((addon) => !selectedAddons.includes(addon));

  const submitIsDisabled = (): boolean => {
    const isDisabled = !(
      customer &&
      address &&
      bookingType &&
      employee &&
      durationInMinutes
    );
    return isDisabled;
  };

  const onAddonSelect = (addon: AddonModel): void => {
    setSelectedAddons([...selectedAddons, addon]);
    setDurationInMinutes(
      calculatePresetTimeInMinutes(selectedAddons).toString()
    );
  };
  const onAddonUnselect = (addon: AddonModel): void => {
    setSelectedAddons(selectedAddons.filter((oldAddon) => oldAddon !== addon));
    setDurationInMinutes(
      calculatePresetTimeInMinutes(selectedAddons).toString()
    );
  };

  const updateBookingType = (value: BookingTypeModel | null): void => {
    setBookingType(value);
    setDurationInMinutes(
      calculatePresetTimeInMinutes(selectedAddons).toString()
    );
  };

  const presenterProps: PresenterProps = {
    isOpen,
    customers,
    setCustomer,
    customer,
    setAddress,
    address,
    employees,
    setEmployee,
    employee,
    setStartTime,
    startTime,
    bookingTypes,
    setBookingType: updateBookingType,
    bookingType,
    availableAddons: availableAddons(),
    selectedAddons,
    onAddonSelect,
    onAddonUnselect,
    durationInMinutes,
    setDurationInMinutes,
    isFrameBooking,
    setIsFrameBooking,
    occurrence,
    setOccurrence,
    frameBookingEndDate,
    setFrameBookingEndDate,
    submitIsDisabled: submitIsDisabled(),
    onSubmit,
    onClose: close,
    isLoading,
    errorMessage,
    availableAddresses: availableAddresses(),
    specialInstructions,
    setSpecialInstructions,
  };

  return <Presenter {...presenterProps} />;
};

export default CreateBooking;
