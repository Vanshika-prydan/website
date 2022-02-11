import React from 'react';
import { useSelector } from 'react-redux';

import {
  getHourlyPriceInclVATWithRUT,
  getPriceInclVAT,
  getPriceInclVATWithRUT,
  getTotalRutDeduction,
  getVAT,
} from '@utils/price-utils';

import ConfirmationReceiptPresenter from './presenter';
import { MakeBookingState } from '@store/make-booking/types';
import { SignedInBookingState } from '@store/signed-in-booking/types';
import { RootState } from '@store/rootReducer';

interface Props {
  booking: MakeBookingState | SignedInBookingState;
  acceptTerms: boolean;
  setAcceptTerms(val: boolean): void;
}

const isSignedInBooking = (
  booking: MakeBookingState | SignedInBookingState
): booking is SignedInBookingState =>
  !!(booking as SignedInBookingState).address;

const ConfirmationReceiptComponent: React.FunctionComponent<Props> = ({
  booking,
  acceptTerms,
  setAcceptTerms,
}) => {
  if (!booking.occurrence || !booking.durationInMinutes) return null;

  const addons = useSelector((state: RootState) => state.addon.addons);
  const account = useSelector(
    (state: RootState) => state.authentication.currentAccount
  );

  const hourlyPrice = getHourlyPriceInclVATWithRUT(booking.occurrence);
  const durationInHours = (booking.durationInMinutes / 60).toString();
  const totalPriceInclRUT = getPriceInclVATWithRUT(
    booking.occurrence,
    booking.durationInMinutes
  );
  const totalPriceExclRUT = getPriceInclVAT(
    booking.occurrence,
    booking.durationInMinutes
  );
  const vat = getVAT(booking.occurrence, booking.durationInMinutes);
  const totalRUTDeduction = getTotalRutDeduction(
    booking.occurrence,
    booking.durationInMinutes
  );
  const startTime = new Date(booking.startTime ?? Date.now());
  const durationInMinutes = booking.durationInMinutes ?? 0;

  let street: string,
    postalCode: string,
    postalCity: string,
    firstName: string,
    lastName: string;

  if (isSignedInBooking(booking)) {
    if (!booking.address) return null;
    if (!account) return null;
    street = booking.address.address.street;
    postalCode = booking.address.address.postalCode;
    postalCity = booking.address.address.postalCity;
    firstName = account.firstName;
    lastName = account.lastName;
  } else {
    street = booking.street;
    postalCode = booking.postalCode;
    postalCity = booking.postalCity;
    firstName = booking.firstName;
    lastName = booking.lastName;
  }

  return (
    <ConfirmationReceiptPresenter
      {...{
        addons,
        occurrence: booking.occurrence,
        startTime,
        hourlyPrice,
        durationInHours,
        durationInMinutes,
        totalPriceInclRUT,
        totalPriceExclRUT,
        vat,
        totalRUTDeduction,
        addonIds: booking.addonIds,
        acceptTerms,
        setAcceptTerms,
        street,
        postalCode,
        postalCity,
        firstName,
        lastName,
      }}
    />
  );
};

export default ConfirmationReceiptComponent;
