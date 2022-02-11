/* eslint-disable no-unused-vars */
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectEmployee from '../../components/forms/select-employee';
import { EmployeeModel } from '../../models/employee.model';
import { FrameBookingModel } from '../../models/frame-booking.model';
import { PublicEmployeeModel } from '../../models/public-employee.model';
import apiService from '../../services/api-service';
import { fetchAllEmployees } from '../../store/employee';
import { updateFrameBooking } from '../../store/frame-booking';
import { RootState } from '../../store/rootReducer';
import generateErrorMessage from '../../utils/generate-error-message';

interface Props {
  open: boolean;
  setOpen(val: boolean): void;
  employeeIsFetched: boolean;
  employees: EmployeeModel[];
  setSelectedEmployeeId(id: string): void;
  selectedEmployeeId: string;
  errorMessage: string;
  isLoading: boolean;
  edit(): void;
}

const EditFrameBookingDialogPresenter = (props: Props) => {
  const {
    open,
    setOpen,
    employeeIsFetched,
    employees,
    setSelectedEmployeeId,
    selectedEmployeeId,
    errorMessage,
    isLoading,
    edit,
  } = props;
  return (
    <>
      <Button color="default" onClick={() => setOpen(true)}>
        Edit frame booking
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Edit subscription</DialogTitle>
        <DialogContent>
          {employeeIsFetched ? (
            <>
              <DialogContentText>Change employee</DialogContentText>
              <SelectEmployee
                employees={employees}
                onSelect={(e) =>
                  setSelectedEmployeeId(e?.employeeId ?? selectedEmployeeId)
                }
                value={
                  employees.find((e) => e.employeeId === selectedEmployeeId)!
                }
              />
              {errorMessage ? (
                <Typography color="error">{errorMessage}</Typography>
              ) : null}
            </>
          ) : (
            <CircularProgress size="small" />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={edit}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size="small" /> : 'Continue'}
          </Button>
          <Button
            onClick={() => setOpen(false)}
            color="secondary"
            autoFocus
            variant="contained"
            disabled={isLoading}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditFrameBookingDialogPresenter;
