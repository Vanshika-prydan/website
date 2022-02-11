import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiService from '../../services/api-service';
import { EmployeeState } from './types';
import { EmployeeModel } from '../../models/employee.model';

const initialState: EmployeeState = Object.freeze({
  employees: [],
  isLoading: false,
  fetched: false,
});

export const fetchAllEmployees = createAsyncThunk(
  'customer/fetchAllEmployees',
  async () => ApiService.fetchAllEmployees()
);

const customerSlice = createSlice({
  name: 'employee',
  initialState: { ...initialState },
  reducers: {},
  extraReducers: {
    [fetchAllEmployees.pending.toString()]: (state) => {
      state.isLoading = true;
      state.employees = [];
    },
    [fetchAllEmployees.rejected.toString()]: (state) => {
      state.isLoading = false;
      state.employees = [];
    },
    [fetchAllEmployees.fulfilled.toString()]: (
      state,
      action: PayloadAction<EmployeeModel[]>
    ) => {
      state.isLoading = false;
      state.employees = action.payload;
      state.fetched = true;
    },
  },
});

export default customerSlice.reducer;
