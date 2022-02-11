/* eslint-disable react/destructuring-assignment */
import { CircularProgress } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AddButton from '../../components/add-button';
import PageTitle from '../../components/page-title';
import PermissionRequired from '../../components/permission-required';
import { EmployeeModel } from '../../models/employee.model';
import { AppDispatch } from '../../store';
import { fetchAllEmployees } from '../../store/employee';
import { RootState } from '../../store/rootReducer';
import CreateEmployee from './create-employee';
import EditEmployee from './edit-employee';
import EmployeeTable from './employee-table';
import EmployeeAvailability from './employee-availability';

export interface EmployeesProps {
  fetchAllEmployees(): void;
  isLoading: boolean;
  employees: EmployeeModel[];
}

interface EmployeeState {
  createEmployeeIsOpen: boolean;
  editEmployee: null | EmployeeModel;
  editEmployeeAvailability: null | EmployeeModel;
}

const initialState: EmployeeState = Object.freeze({
  createEmployeeIsOpen: false,
  editEmployee: null,
  editEmployeeAvailability: null,
});

class Employees extends Component<EmployeesProps, EmployeeState> {
  state: EmployeeState;

  constructor(props: EmployeesProps) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidMount() {
    this.props.fetchAllEmployees();
  }

  onEmployeeCreated = () => {
    this.setCreateEmployeeIsOpen(false);
    this.props.fetchAllEmployees();
  };

  setCreateEmployeeIsOpen = (val: boolean) =>
    this.setState({ createEmployeeIsOpen: val });

  render() {
    return (
      <div>
        <PageTitle title="Employees">
          <PermissionRequired permission="EMPLOYEE_CREATE">
            <AddButton onClick={() => this.setCreateEmployeeIsOpen(true)}>
              ADD EMPLOYEE
            </AddButton>
          </PermissionRequired>
        </PageTitle>
        {this.props.isLoading ? (
          <CircularProgress data-test="LOADING_SPINNER" />
        ) : (
          <>
            {' '}
            <EmployeeTable
              employees={this.props.employees}
              onEmployeeEdit={(editEmployee) => this.setState({ editEmployee })}
              onEditEmployeeAvailability={(editEmployeeAvailability) =>
                this.setState({ editEmployeeAvailability })
              }
            />
            {this.state.editEmployee ? (
              <EditEmployee
                employee={this.state.editEmployee}
                isOpen={!!this.state.editEmployee}
                onClose={() => {
                  this.setState({ editEmployee: null });
                  this.props.fetchAllEmployees();
                }}
              />
            ) : null}
          </>
        )}
        <CreateEmployee
          isOpen={this.state.createEmployeeIsOpen}
          onCancel={() => this.setCreateEmployeeIsOpen(false)}
          onCreated={this.onEmployeeCreated}
        />
        {this.state.editEmployeeAvailability && (
          <EmployeeAvailability
            employee={this.state.editEmployeeAvailability}
            isOpen={!!this.state.editEmployeeAvailability}
            onClose={() => {
              this.setState({ editEmployeeAvailability: null });
            }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  employees: state.employee.employees,
  isLoading: state.employee.isLoading,
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchAllEmployees: () => dispatch(fetchAllEmployees()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Employees);
