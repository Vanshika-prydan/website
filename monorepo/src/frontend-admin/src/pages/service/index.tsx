/* eslint-disable react/destructuring-assignment */
import { Box, Typography, Divider, CircularProgress } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { AddonModel } from '../../models/addon.model';
import { AppDispatch } from '../../store';
import { fetchAllAddons } from '../../store/addon';
import { fetchAllBookingTypes } from '../../store/booking-type';
import { RootState } from '../../store/rootReducer';
import AddService from './add-service';
import { ServiceList } from './service-list';

import AddonList from './addon-service-list';
import AddButton from '../../components/add-button';
import PermissionRequired from '../../components/permission-required';
import PageTitle from '../../components/page-title';

export interface Props {
  fetchAllBookingTypes(): void;
  fetchAllAddons(): void;
  addons: AddonModel[];
  isLoadingServices: boolean;
}
interface State {
  addServiceIsOpen: boolean;
}

const initialState: State = Object.freeze({
  addServiceIsOpen: false,
});

class Service extends Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidMount() {
    this.props.fetchAllBookingTypes();
    this.props.fetchAllAddons();
  }

  onCloseAddService = () => {
    this.setState({ addServiceIsOpen: false });
    this.props.fetchAllBookingTypes();
    this.props.fetchAllAddons();
  };

  render() {
    return (
      <>
        <PageTitle title="Services">
          <PermissionRequired permission="BOOKING_CREATE_BOOKING_TYPE">
            <PermissionRequired permission="BOOKING_CREATE_ADDON">
              <AddButton
                onClick={() => this.setState({ addServiceIsOpen: true })}
              >
                ADD SERVICE
              </AddButton>
            </PermissionRequired>
          </PermissionRequired>
        </PageTitle>
        <Box>
          <Typography variant="h5">Main services</Typography>
        </Box>
        <ServiceList />
        <AddService
          isOpen={this.state.addServiceIsOpen}
          onClose={this.onCloseAddService}
        />

        <Divider />
        <Box display="flex" justifyContent="space-between" marginTop="25px">
          <Box>
            <Typography variant="h5" component="h2">
              Addon services
            </Typography>
          </Box>
        </Box>
        {this.props.isLoadingServices ? (
          <CircularProgress data-test="LOADING_SPINNER" />
        ) : (
          <AddonList addons={this.props.addons} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  addons: state.addon.addons,
  isLoadingServices: state.addon.isLoading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchAllBookingTypes: () => dispatch(fetchAllBookingTypes()),
  fetchAllAddons: () => dispatch(fetchAllAddons()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Service);
