import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Customer from './pages/customer';
import Employees from './pages/employee';
import Login from './pages/login';
import Service from './pages/service';
import BookingPage from './pages/booking';
import AuthenticationService from './services/authentication-service';
import PrivateRoute from './utils/private-route';
import FrameBooking from './pages/frame-booking';
import Account from './pages/account';

AuthenticationService.onLoad();

function App () {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <PrivateRoute path="/booking" exact>
          <BookingPage />
        </PrivateRoute>
        <PrivateRoute path="/employee" exact permission="EMPLOYEE_LIST_ALL">
          <Employees />
        </PrivateRoute>
        <PrivateRoute path="/customer" exact permission="CUSTOMER_LIST_ALL">
          <Customer />
        </PrivateRoute>
        <PrivateRoute
          path="/frame-booking/:frameBookingId"
          exact
          permission="BOOKING_LIST_ALL_BOOKINGS"
        >
          <FrameBooking />
        </PrivateRoute>
        <PrivateRoute path="/service" exact permission="CUSTOMER_LIST_ALL">
          <Service />
        </PrivateRoute>
        <PrivateRoute path="/account" exact permission="CUSTOMER_LIST_ALL">
          <Account />
        </PrivateRoute>
        <PrivateRoute path="/account/:accountId">
          <Account />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
