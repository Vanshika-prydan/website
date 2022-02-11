/* eslint-disable react/require-default-props */
import { Divider, Grid, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { AccountModel } from '../../../models/account.model';
import { CustomerModel } from '../../../models/customer.model';
import { EmployeeModel } from '../../../models/employee.model';

interface ViewAccountPrestenterProps {
  account: AccountModel;
  employee?: EmployeeModel;
  customer?: CustomerModel;
}

const ViewAccountPrestenter = ({
  account,
  employee,
  customer,
}: ViewAccountPrestenterProps) => (
  <>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Account details</Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography>Name:</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{`${account.lastName} ${account.firstName}`}</Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography>Email:</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{`${account.email}`}</Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography>Phone number:</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{`${account.phoneNumber ?? ''}`}</Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography>Roles:</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>
          {account.roles.map((r) => r.name.toLowerCase())}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>Account id</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{account.accountId} </Typography>
      </Grid>

      {customer ? (
        <>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5"> Customer details </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography>Addresses:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              {customer.addresses?.map((a) => (
                <Fragment key={a.customerAddressId}>
                  <Typography>{a.address.street}</Typography>
                  <Typography>{`${a.address.postalCode} ${a.address.postalCity}`}</Typography>
                  {a.address.code ? (
                    <Typography>{`Code: ${a.address.code}`}</Typography>
                  ) : null}
                  {a.address.information ? (
                    <Typography>
                      Information: {a.address.information}
                    </Typography>
                  ) : null}
                </Fragment>
              ))}
            </Typography>
          </Grid>
        </>
      ) : null}

      {employee ? (
        <>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5"> Employee details </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Employee id</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{`${employee.employeeId}`}</Typography>
          </Grid>
        </>
      ) : null}
    </Grid>
  </>
);

export default ViewAccountPrestenter;
