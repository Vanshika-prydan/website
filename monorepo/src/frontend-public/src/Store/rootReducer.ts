import { combineReducers } from "@reduxjs/toolkit";

import cookiesReducer from "./cookies";

const rootReducer = combineReducers({
  cookies: cookiesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
