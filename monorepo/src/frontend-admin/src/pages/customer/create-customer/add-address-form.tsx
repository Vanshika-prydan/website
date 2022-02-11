import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import ApiService from '../../../services/api-service/api-service';
import { AddCustomerAddressRequestPayload } from '../../../services/api-service/types';
import { CustomerModel } from '../../../models/customer.model';
import { generateErrorMessage } from '../../../utils/generate-error-message';

export interface AddAddressProps {
  onClose(): void;
  // eslint-disable-next-line no-unused-vars
  onAddedAddress(customer: CustomerModel): void;
  customerId: string | undefined;
}

export default function AddAddressForm(props: AddAddressProps) {
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [postalCity, setPostalCity] = useState('');
  const [code, setCode] = useState('');
  const [information, setInformation] = useState('');

  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setSubmitIsDisabled(
      !props.customerId || !street || !postalCode || !postalCity || isLoading
    );
  });

  const resetState = () => {
    setStreet('');
    setPostalCode('');
    setPostalCity('');
    setCode('');
    setInformation('');
    setSubmitIsDisabled(true);
    setIsLoading(false);
    setErrorMessage('');
  };

  const onClose = () => {
    resetState();
    props.onClose();
  };

  const bindAddressToCustomer = async () => {
    if (!props.customerId) throw new Error('No given customer id');
    try {
      setIsLoading(true);
      setErrorMessage('');
      const payload: AddCustomerAddressRequestPayload = {
        information,
        street,
        postalCity,
        postalCode,
        country: 'SE',
        code: code || undefined,
      };
      const updatedCustomer = await ApiService.addCustomerAddress(
        payload,
        props.customerId
      );
      resetState();
      props.onAddedAddress(updatedCustomer);
    } catch (e) {
      setIsLoading(false);
      setErrorMessage(generateErrorMessage(e));
    }
  };

  return (
    <>
      <Grid container spacing={3} data-test="ADD_ADDRESS_FORM">
        <Grid item>
          <Typography variant="body1">Add address</Typography>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              id="street"
              data-test="street"
              name="street"
              label="Street"
              fullWidth
              autoComplete="street-address"
              type="text"
              value={street}
              required
              onChange={(e) => setStreet(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              size="small"
              id="postalCode"
              data-test="postalCode"
              name="postalCode"
              label="Postal code"
              fullWidth
              autoComplete="postal-code"
              type="number"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              size="small"
              id="postalCity"
              data-test="postalCity"
              name="postalCity"
              label="Postal city"
              fullWidth
              autoComplete="address-level12"
              type="text"
              required
              value={postalCity}
              onChange={(e) => setPostalCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              id="code"
              data-test="code"
              name="code"
              label="Door code"
              fullWidth
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              id="information"
              data-test="information"
              name="information"
              label="Information"
              fullWidth
              multiline
              rowsMax={4}
              type="text"
              value={information}
              onChange={(e) => setInformation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                color="primary"
                variant="contained"
                data-test="ADD_ADDRESS_SUBMIT"
                disabled={submitIsDisabled}
                onClick={bindAddressToCustomer}
              >
                Add address
              </Button>
              <Button onClick={onClose}>Continue without the address</Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {errorMessage ? (
              <Typography color="error" data-test="ADD_ADDRESS_ERROR_MESSAGE">
                {errorMessage}
              </Typography>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
