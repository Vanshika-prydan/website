import { Grid } from '@material-ui/core';
import React from 'react';
import Header from './header';
import Menu from './menu';

const PrivatePageSetup: React.FunctionComponent = ({ children }) => (
  <>
    <Grid container>
      <Grid item xs={1} md={2} />
      <Grid item xs={10} md={8}>
        <Header />
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <Menu />
          </Grid>
          <Grid item xs={12} md={9}>
            {children}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} md={2} />
    </Grid>
  </>
);
export default PrivatePageSetup;
