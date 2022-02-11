import { Grid, TextField, Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { useCreateCustomer } from './use-create-customer';
import ApiService from '../../../services/api-service';
import { CustomerModel } from '../../../models/customer.model';

export interface CreateCustomerFormProps {
  onCancel(): void;
  // eslint-disable-next-line no-unused-vars
  onCreated(customer: CustomerModel): void;
}

export default function CreateCustomerForm(props: CreateCustomerFormProps) {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    createCustomer,
    submitIsDisabled,
    errorMessage,
    resetState,
    personalIdentityNumber,
    setPersonalIdentityNumber,
    // eslint-disable-next-line react/destructuring-assignment
  } = useCreateCustomer({ ApiService, onCreated: props.onCreated });

  const onCancel = () => {
    resetState();
    props.onCancel();
  };

  return (
    <Grid container spacing={3} data-test="CREATE_CUSTOMER_FORM">
      <Grid item xs={12} md={6}>
        <TextField
          size="small"
          required
          autoFocus
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
      <Grid item xs={12} md={6}>
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
      <Grid item xs={12} md={6}>
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
      <Grid item xs={12} md={6}>
        <TextField
          size="small"
          id="phone"
          required
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

      <Grid item xs={12} md={6}>
        <TextField
          size="small"
          id="personalIdentityNumber"
          variant="outlined"
          data-test="personalIdentityNumber"
          name="personalIdentityNumber"
          label="Personal Identity Number (SSN)"
          fullWidth
          required
          type="text"
          value={personalIdentityNumber}
          onChange={(e) => setPersonalIdentityNumber(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            color="primary"
            variant="contained"
            disabled={submitIsDisabled}
            data-test="ADD_CUSTOMER_SUBMIT"
            onClick={createCustomer}
          >
            Add customer
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {errorMessage ? (
          <Typography
            color="error"
            data-test="ERROR_MESSAGE"
            style={{ textAlign: 'center' }}
          >
            {errorMessage}
          </Typography>
        ) : null}
      </Grid>
    </Grid>
  );
}
