/* eslint-disable no-unused-vars */
import {
  Grid,
  Dialog,
  DialogContent,
  Collapse,
  Box,
  Button,
  DialogActions,
} from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import DialogTitle from '../../../components/dialog-title';
import { CustomerModel } from '../../../models/customer.model';
import AddAddressForm from './add-address-form';
import CreateCustomerForm from './create-customer-form';

export interface CreateCustomerProps {
  onClose(): void;
  isOpen: boolean;
  initialState?: {
    addAddressIsExpanded?: boolean;
    createdCustomer?: CustomerModel;
  };
}

export default function CreateCustomer({
  onClose,
  isOpen,
  initialState,
}: CreateCustomerProps) {
  const [addAddressIsExpanded, setAddAddressIsExpanded] = useState(
    initialState?.addAddressIsExpanded ?? false
  );
  const [createdCustomer, setCreatedCustomer] = useState<
    CustomerModel | undefined
  >(initialState?.createdCustomer);

  const resetState = () => {
    setAddAddressIsExpanded(false);
    setCreatedCustomer(undefined);
  };

  const close = () => {
    resetState();
    onClose();
  };

  const onCustomerCreated = (customer: CustomerModel) => {
    setCreatedCustomer(customer);
  };

  return (
    <>
      <Dialog open={isOpen} fullWidth>
        <DialogTitle onClose={close}>Add new customer</DialogTitle>
        <DialogContent>
          {!createdCustomer ? (
            <CreateCustomerForm
              onCancel={close}
              onCreated={onCustomerCreated}
            />
          ) : null}

          {createdCustomer && !addAddressIsExpanded ? (
            <Grid container>
              <Grid item xs={12} spacing={3}>
                <Box
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    data-test="ADD_ADDRESS_BUTTON"
                    onClick={() => setAddAddressIsExpanded(true)}
                  >
                    Add an address
                  </Button>
                  <Button onClick={close}>Im finish</Button>
                </Box>
              </Grid>
            </Grid>
          ) : null}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Collapse in={addAddressIsExpanded} timeout="auto" unmountOnExit>
                <AddAddressForm
                  onAddedAddress={close}
                  onClose={close}
                  customerId={createdCustomer?.customerId}
                />
              </Collapse>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions />
      </Dialog>
    </>
  );
}
