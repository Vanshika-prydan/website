import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreditCardModel } from '../../models/credit-card.model';
import apiService from '../../services/api-service';
import { CreditCardState } from './types';

const initialState: CreditCardState = {
  creditCards: [],
  isLoading: false,
};

Object.freeze(initialState);

export const fetchAllCards = createAsyncThunk(
  'creditCard/fetchAllCards',
  async () => apiService.getAllCreditCards()
);

const creditCardSlice = createSlice({
  name: 'creditCard',
  initialState: { ...initialState },
  reducers: {
    setCards: (state, action: PayloadAction<CreditCardModel[]>) => {
      state.creditCards = action.payload;
    },
  },
  extraReducers: {
    [fetchAllCards.pending.toString()]: (state) => {
      state.isLoading = true;
      state.creditCards = [];
    },
    [fetchAllCards.rejected.toString()]: (state) => {
      state.isLoading = false;
      state.creditCards = [];
    },
    [fetchAllCards.fulfilled.toString()]: (
      state,
      action: PayloadAction<CreditCardModel[]>
    ) => {
      state.isLoading = false;
      state.creditCards = action.payload;
    },
  },
});

export const creditCardActions = creditCardSlice.actions;

export default creditCardSlice.reducer;
