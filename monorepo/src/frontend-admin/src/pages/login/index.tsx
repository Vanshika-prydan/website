import {
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Grid,
  Paper,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useLogin } from './useLogin';
import { RootState } from '../../store/rootReducer';

import backgroundImage from '../../assets/cg-bg.jpg';

import logo from '../../assets/logo-green.svg';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
      height: '100%',
      minHeight: '100vh',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: '120vw auto',
      alignItems: 'center',
    },
  })
);

export interface LoginProps {}
const Login = () => {
  const styles = useStyles();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const onSuccess = () => {};
  const onFailure = () => {};
  const {
    submitIsDisabled,
    email,
    setEmail,
    isLoading,
    password,
    setPassword,
    login,
    error,
  } = useLogin({ onFailure, onSuccess });
  if (isAuthenticated) return <Redirect to="/booking" />;
  return (
    <div className={styles.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper variant="outlined" style={{ padding: 50 }}>
          <img src={logo} alt="We Clean Green" style={{ paddingBottom: 20 }} />
          <Grid container justify="center">
            <Typography component="h2" variant="h5">
              Sign in
            </Typography>
          </Grid>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={submitIsDisabled}
            >
              Sign In
            </Button>
            {isLoading ? (
              <Grid container justify="center">
                <CircularProgress />
              </Grid>
            ) : null}
            {error ? (
              <Typography color="error" align="center">
                {error}
              </Typography>
            ) : null}
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
