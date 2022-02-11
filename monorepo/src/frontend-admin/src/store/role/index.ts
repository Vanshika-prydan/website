import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleState } from './types';
import ApiService from '../../services/api-service';
import { RoleModel } from '../../models/role.model';

const initialState: RoleState = Object.freeze({
  roles: [],
  isLoading: false,
});

export const fetchAllRoles = createAsyncThunk('role/fetchAllRoles', async () =>
  ApiService.fetchAllRoles()
);

const roleSlice = createSlice({
  name: 'role',
  initialState: { ...initialState },
  reducers: {},
  extraReducers: {
    [fetchAllRoles.pending.toString()]: (state) => {
      state.error = undefined;
      state.isLoading = true;
      state.roles = [];
    },
    [fetchAllRoles.rejected.toString()]: (state) => {
      state.error = undefined;
      state.isLoading = false;
      state.roles = [];
      // TODO
    },
    [fetchAllRoles.fulfilled.toString()]: (
      state,
      action: PayloadAction<RoleModel[]>
    ) => {
      state.error = undefined;
      state.isLoading = false;
      state.roles = action.payload;
    },
  },
});

export default roleSlice.reducer;
