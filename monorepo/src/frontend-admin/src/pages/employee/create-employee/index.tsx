import {
  Typography,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import * as React from 'react';
import DialogTitle from '../../../components/dialog-title';
import ApiService from '../../../services/api-service';
import { useCreateEmployee } from './use-create-employee';

export interface CreateEmployeeProps {
  onCancel(): void;
  onCreated(): void;
  isOpen: boolean;
}

export default function CreateEmployee({
  onCancel,
  onCreated,
  isOpen,
}: CreateEmployeeProps) {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    createEmployee,
    submitIsDisabled,
    errorMessage,
  } = useCreateEmployee({ ApiService, onCreated });

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle onClose={onCancel}>Add new employee</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                variant="outlined"
                id="firstName"
                data-test="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                variant="outlined"
                id="lastName"
                name="lastName"
                data-test="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                variant="outlined"
                type="email"
                id="email"
                data-test="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                variant="outlined"
                type="password"
                data-test="password"
                id="password"
                name="password"
                label="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                id="phone"
                variant="outlined"
                data-test="phoneNumber"
                name="phone"
                label="Phone number"
                fullWidth
                autoComplete="tel"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
            {errorMessage ? (
              <Grid item xs={12}>
                <Typography color="error">{errorMessage}</Typography>
              </Grid>
            ) : null}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            disabled={submitIsDisabled}
            data-test="ADD_EMPLOYEE_SUBMIT"
            onClick={createEmployee}
          >
            Add employee
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
