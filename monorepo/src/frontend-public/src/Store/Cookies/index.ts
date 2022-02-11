import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isFunctional: false,
  isStatistick: false,
  isMarketing: false,
  isAll: false,
  isNecessary: false,
  isSetCookie: false,
};
const cookiesSlice = createSlice({
  name: 'cookies',
  initialState: { ...initialState },
  reducers: {

      setIsAllowFunctional: (state: { isFunctional: any; }, action: PayloadAction<boolean>) => {
      state.isFunctional = action.payload;
    },
    setIsAllowStatistics: (state: { isStatistick: any; }, action: PayloadAction<boolean>) => {
      state.isStatistick = action.payload
    },
    setIsAllowMarketing: (state: { isMarketing: any; }, action: PayloadAction<boolean>) => {
      state.isMarketing = action.payload
    },
    setIsAllowAll: (state: { isAll: any; }, action: PayloadAction<boolean>) => {
      state.isAll = action.payload
    },
    setIsAllowNecessary: (state: { isNecessary: any; }, action: PayloadAction<boolean>) => {
      state.isNecessary = action.payload
    },
    setIsAllowSetCookie: (state: { isSetCookie: any; }, action: PayloadAction<boolean>) => {
      state.isSetCookie = action.payload
    },
  },
});
export const CookiesActions = cookiesSlice.actions;
export default cookiesSlice.reducer;





