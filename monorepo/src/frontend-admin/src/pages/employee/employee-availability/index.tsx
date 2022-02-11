import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import DialogTitle from '../../../components/dialog-title';
import {
  DefaultEmployeeAvailabilityCheck,
  Day,
} from '../../../models/employee-default-availability';
import { EmployeeModel } from '../../../models/employee.model';
import ApiService from '../../../services/api-service';
import { generateErrorMessage } from '../../../utils/generate-error-message';
import EmployeeAvaibilityRow, { defaultAvailabilityValue } from './row';
import { SetAvailabilityRequestPayload } from '../../../services/api-service/types';

const AvaibilitySlot: Day[] = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

interface Props {
  employee: EmployeeModel;
  isOpen: boolean;
  onClose(): void;
}

const useEditEmployee = (employee: EmployeeModel, onSuccess: () => void) => {
  const [firstName, setfirstName] = useState(employee.account.firstName);
  const [lastName, setlastName] = useState(employee.account.lastName);
  const [defaultAvailability, setDefaultAvailability] = useState<
    DefaultEmployeeAvailabilityCheck[]
  >();
  const [defaultAvailabilityPayload, setDefaultAvailabilityPayload] = useState<
    SetAvailabilityRequestPayload[]
  >([]);

  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const fetchAvailability = async () => {
    setisLoading(true);
    seterrorMessage('');
    try {
      const result: DefaultEmployeeAvailabilityCheck[] = await ApiService.getDefaultEmployeeAvailability(
        employee.employeeId
      );
      result.map((orgItem) => {
        const item = { ...orgItem };
        if (
          item.startHour === 0 &&
          item.startMinute === 0 &&
          item.endHour === 0 &&
          item.endMinute === 0
        ) {
          item.isCheck = false;
        } else {
          item.isCheck = true;
        }
        return item;
      });
      setDefaultAvailability(result);
    } catch (e) {
      seterrorMessage(generateErrorMessage(e));
    } finally {
      setisLoading(false);
    }
  };

  const save = async () => {
    setisLoading(true);
    seterrorMessage('');

    try {
      const availability: SetAvailabilityRequestPayload[] = [];
      defaultAvailabilityPayload.map((item) => {
        if (
          item.startHour !== 0 ||
          item.startMinute !== 0 ||
          item.endHour !== 0 ||
          item.endMinute !== 0
        ) {
          availability.push(item);
        }
        return item;
      });
      await ApiService.setDefaultEmployeeAvailability(
        employee.employeeId,
        availability
      );
      onSuccess();
      return;
    } catch (e) {
      setisLoading(false);
      seterrorMessage(generateErrorMessage(e));
    }
    setisLoading(false);
  };

  return {
    fetchAvailability,
    defaultAvailability,
    save,
    firstName,
    setDefaultAvailability,
    setDefaultAvailabilityPayload,
    lastName,
    setfirstName,
    setlastName,
    isLoading,
    errorMessage,
    isError,
    setIsError,
  };
};
const EmployeeDefaultAvailability = ({ isOpen, onClose, employee }: Props) => {
  const {
    save,
    fetchAvailability,
    defaultAvailability,
    setDefaultAvailability,
    setDefaultAvailabilityPayload,
    isLoading,
    firstName,
    lastName,
    setfirstName,
    setlastName,
    errorMessage,
    isError,
    setIsError,
  } = useEditEmployee(employee, onClose);

  useEffect(() => {
    setfirstName(employee.account.firstName);
    setlastName(employee.account.lastName);
    fetchAvailability();
  }, []);

  useEffect(() => {
    if (defaultAvailability) {
      const payload: SetAvailabilityRequestPayload[] = defaultAvailability.map(
        (item) => {
          const ret = {
            day: item.day,
            startHour: item.startHour,
            startMinute: item.startMinute,
            endHour: item.endHour,
            endMinute: item.endMinute,
          };
          return ret;
        }
      );
      setDefaultAvailabilityPayload(payload);
    }
  }, [defaultAvailability]);

  const updateDayValue = (updatedDay: DefaultEmployeeAvailabilityCheck) => {
    let availability: DefaultEmployeeAvailabilityCheck[] = [];
    if (defaultAvailability) {
      availability = defaultAvailability;
      const availabilityDayIndex = availability.findIndex(
        (value) => value.day === updatedDay.day
      );
      if (availabilityDayIndex >= 0) {
        availability.splice(availabilityDayIndex, 1, updatedDay);
      } else {
        availability.push(updatedDay);
      }
    } else {
      availability.push(updatedDay);
    }
    setDefaultAvailability([...availability]);
  };
  const removeFromDefaultAvailability = (
    toDeletDay: DefaultEmployeeAvailabilityCheck
  ) => {
    let availability: DefaultEmployeeAvailabilityCheck[] = [];
    if (defaultAvailability) {
      availability = defaultAvailability;
      const availabilityDayIndex = availability.findIndex(
        (value) => value.day === toDeletDay.day
      );
      if (availabilityDayIndex >= 0) {
        availability.splice(availabilityDayIndex, 1);
      }
      setDefaultAvailability([...availability]);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle onClose={onClose}>
        Employee availability ({firstName} {lastName})
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          {errorMessage ? (
            <Grid item xs={12}>
              <Typography color="error">{errorMessage}</Typography>
            </Grid>
          ) : null}
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {defaultAvailability &&
                employee &&
                AvaibilitySlot.map((e, index) => {
                  let availability: DefaultEmployeeAvailabilityCheck = {
                    ...defaultAvailabilityValue,
                    ...{ employeeId: employee.employeeId, day: e },
                  };
                  const availabilityVal = defaultAvailability.find(
                    (value) => value.day === e
                  );
                  if (availabilityVal) {
                    availability = { ...availabilityVal, ...{ isCheck: true } };
                  }
                  return (
                    <EmployeeAvaibilityRow
                      key={index.toString()}
                      employeeAvailability={availability}
                      onChangeDay={updateDayValue}
                      onSetError={setIsError}
                      removeItem={removeFromDefaultAvailability}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={save} color="primary" disabled={isLoading || isError}>
          {isLoading ? <CircularProgress /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeDefaultAvailability;
