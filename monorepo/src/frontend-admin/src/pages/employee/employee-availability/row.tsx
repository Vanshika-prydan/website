import React, { useState, useEffect } from 'react';
import {
  TableRow,
  TableCell,
  Typography,
  Checkbox,
  TextField,
} from '@material-ui/core';
import TimeField from 'react-simple-timefield';
import { DefaultEmployeeAvailabilityCheck } from '../../../models/employee-default-availability';

export interface EmployeeCardProps {
  employeeAvailability: DefaultEmployeeAvailabilityCheck;
  // eslint-disable-next-line no-unused-vars
  onChangeDay(dayUpdate: DefaultEmployeeAvailabilityCheck): void;
  // eslint-disable-next-line no-unused-vars
  onSetError(isError: boolean): void;
  // eslint-disable-next-line no-unused-vars
  removeItem(dayUpdate: DefaultEmployeeAvailabilityCheck): void;
}

const setPadStart = (value: number | string) => {
  if (typeof value === 'number') {
    return String(value).padStart(2, '0');
  }
  return value.padStart(2, '0');
};

export const defaultAvailabilityValue: DefaultEmployeeAvailabilityCheck = {
  employeeId: '0',
  day: 'MONDAY',
  startHour: 9,
  endHour: 18,
  startMinute: 0,
  endMinute: 0,
  isCheck: false,
};

export default function EmployeeAvaibilityRow({
  employeeAvailability,
  onChangeDay,
  onSetError,
  removeItem,
}: EmployeeCardProps) {
  const [toError, setToError] = useState('');
  const [fromError, setFromError] = useState('');
  const [checked, setChecked] = React.useState(
    employeeAvailability.isCheck ? employeeAvailability.isCheck : false
  );
  const [startHours, setStartHours] = useState(
    `${setPadStart(employeeAvailability.startHour)}:${setPadStart(
      employeeAvailability.startMinute
    )}`
  );

  const [endHours, setEndHours] = useState(
    `${setPadStart(employeeAvailability.endHour)}:${setPadStart(
      employeeAvailability.endMinute
    )}`
  );
  useEffect(() => {
    setFromError('');
    setToError('');
    onSetError(false);
    const hoursArr = startHours.split(':');
    const number1 = parseInt(hoursArr[0], 10);
    const number2 = parseInt(hoursArr[1], 10);

    const endHoursArr = endHours.split(':');
    const endnumber1 = parseInt(endHoursArr[0], 10);
    const endnumber2 = parseInt(endHoursArr[1], 10);
    if (
      number1 > endnumber1 ||
      (number1 === endnumber1 && number2 > endnumber2)
    ) {
      setFromError('Start Time must be less than End Time');
      setToError('');
      onSetError(true);
    }
    return () => {};
  }, [startHours]);

  useEffect(() => {
    setFromError('');
    setToError('');
    onSetError(false);
    const hoursArr = endHours.split(':');
    const number1 = parseInt(hoursArr[0], 10);
    const number2 = parseInt(hoursArr[1], 10);

    const startHoursArr = startHours.split(':');
    const startnumber1 = parseInt(startHoursArr[0], 10);
    const startnumber2 = parseInt(startHoursArr[1], 10);

    if (
      number1 < startnumber1 ||
      (number1 === startnumber1 && number2 < startnumber2)
    ) {
      setFromError('');
      onSetError(true);
      setToError('End Time must be greater than Start Time');
    }
    return () => {};
  }, [endHours]);

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            checked={checked}
            onChange={(event) => {
              if (!event.target.checked) {
                removeItem(employeeAvailability);
              } else {
                onChangeDay({ ...employeeAvailability });
              }
              setChecked(event.target.checked);
            }}
          />
          {`${employeeAvailability.day}`}
        </TableCell>
        <TableCell>
          <TimeField
            value={startHours}
            input={
              <TextField
                disabled={!checked}
                size="small"
                autoFocus
                variant="outlined"
              />
            }
            onChange={(event, value) => {
              const valueArr = value.split(':');
              setStartHours(value);
              onChangeDay({
                ...employeeAvailability,
                ...{
                  startHour: Number.parseInt(valueArr[0], 10),
                  startMinute: Number.parseInt(valueArr[1], 10),
                },
              });
            }}
            colon=":"
            style={{ width: 70, textAlign: 'center' }}
          />
        </TableCell>
        <TableCell>
          <TimeField
            value={endHours}
            onChange={(event, value) => {
              setEndHours(value);
              const valueArr = value.split(':');
              onChangeDay({
                ...employeeAvailability,
                ...{
                  endHour: Number.parseInt(valueArr[0], 10),
                  endMinute: Number.parseInt(valueArr[1], 10),
                },
              });
            }}
            input={
              <TextField
                disabled={!checked}
                size="small"
                autoFocus
                variant="outlined"
              />
            }
            colon=":"
            style={{ width: 70, textAlign: 'center' }}
          />
        </TableCell>
      </TableRow>
      {(toError !== '' || fromError !== '') && (
        <TableRow>
          <TableCell />
          <TableCell colSpan={2} className="text-danger">
            <Typography color="error">
              {toError !== '' ? toError : fromError}{' '}
            </Typography>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
