/* eslint-disable no-unused-vars */
import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import DialogTitle from '../../../components/dialog-title';
import { EmployeeModel } from '../../../models/employee.model';
import ApiService from '../../../services/api-service';
import { generateErrorMessage } from '../../../utils/generate-error-message';

interface Props {
  employee: EmployeeModel;
  isOpen: boolean;
  onClose(): void;
}

const useEditEmployee = (employee: EmployeeModel, onSuccess: () => void) => {
  const [firstName, setfirstName] = useState(employee.account.firstName);
  const [lastName, setlastName] = useState(employee.account.lastName);
  const [phoneNumber, setphoneNumber] = useState(
    employee.account.phoneNumber ?? ''
  );

  const [isLoading, setisLoading] = useState(false);
  const [submitIsDisabled, setsubmitIsDisabled] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');

  const save = async () => {
    setisLoading(true);
    seterrorMessage('');
    try {
      await ApiService.editAccount({
        firstName,
        lastName,
        phoneNumber,
        accountId: employee.account.accountId,
      });
      onSuccess();
      return;
    } catch (e) {
      setisLoading(false);
      seterrorMessage(generateErrorMessage(e));
    }
    setisLoading(false);
  };

  return {
    save,
    firstName,
    setfirstName,
    lastName,
    setlastName,
    phoneNumber,
    setphoneNumber,
    isLoading,
    submitIsDisabled,
    errorMessage,
  };
};

const EditEmployee = ({ isOpen, onClose, employee }: Props) => {
  const {
    errorMessage,
    save,
    firstName,
    setfirstName,
    lastName,
    setlastName,
    phoneNumber,
    setphoneNumber,
    isLoading,
    submitIsDisabled,
  } = useEditEmployee(employee, onClose);
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle onClose={onClose}>Edit employee</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              size="small"
              autoFocus
              required
              variant="outlined"
              id="firstname"
              label="First name"
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              size="small"
              required
              variant="outlined"
              id="lastname"
              label="Last name"
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              size="small"
              variant="outlined"
              id="phonenumber"
              label="Phone number"
              type="text"
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
              fullWidth
            />
          </Grid>
          {errorMessage
            ? (
            <Grid item xs={12}>
              <Typography color="error">{errorMessage}</Typography>
            </Grid>
              )
            : null}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={save} color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployee;
