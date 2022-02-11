/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddButton from '../../components/add-button';
import PageTitle from '../../components/page-title';
import { CustomerModel } from '../../models/customer.model';
import { AppDispatch } from '../../store';
import { fetchAllCustomers } from '../../store/customer';
import { RootState } from '../../store/rootReducer';
import CreateCustomer from './create-customer';
import CustomerList from './customer-list';

export interface CustomerProps {
  fetchAllCustomers(): void;
  customerStore: {
    customers: CustomerModel[];
    isLoading: boolean;
  };
}
export interface CustomerState {
  createCustomerIsOpen: boolean;
}

const initialState: CustomerState = Object.freeze({
  createCustomerIsOpen: false,
});

class Customer extends Component<CustomerProps, CustomerState> {
  state: CustomerState;

  constructor(props: CustomerProps) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidMount() {
    this.props.fetchAllCustomers();
  }

  setCreateCustomerIsOpen = (val: boolean) =>
    this.setState({ createCustomerIsOpen: val });

  onCreateCustomerClose = () => {
    this.setCreateCustomerIsOpen(false);
    this.props.fetchAllCustomers();
  };

  render() {
    return (
      <div>
        <PageTitle title="Customers">
          <AddButton
            data-test="ADD_CUSTOMER_BUTTON"
            onClick={() => this.setCreateCustomerIsOpen(true)}
          >
            ADD CUSTOMER
          </AddButton>
        </PageTitle>

        <CreateCustomer
          isOpen={this.state.createCustomerIsOpen}
          onClose={this.onCreateCustomerClose}
        />

        <CustomerList />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  customerStore: state.customer,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchAllCustomers: () => dispatch(fetchAllCustomers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
