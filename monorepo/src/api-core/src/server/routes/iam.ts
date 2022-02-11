import express from 'express';

import rateLimit from 'express-rate-limit';

import { validateRequest } from '../middlewares/validate-request-middleware';

import loginController, { LoginRequestModel } from '../controllers/iam/login';
import refreshTokenController from '../controllers/iam/refresh-token';
import jwtLoginController, { JWTLoginRequestModel } from '../controllers/iam/jwt-login';
import { JWTRefreshTokenRequestModel } from '../controllers/iam/jwt-refresh-token/jwt-refresh-token-request-moel';
import jwtRefreshTokenController from '../controllers/iam/jwt-refresh-token';
import { ForgottenPasswordRequestModel } from '../controllers/iam/forgotten-password/forgotten-password-request-model';
import forgottenPasswordController from '../controllers/iam/forgotten-password';
import { ConfirmForgottenPasswordRequestModel } from '../controllers/iam/confirm-forgotten-password/confirm-forgotten-password-request-model';
import confirmForgottenPasswordController from '../controllers/iam/confirm-forgotten-password';
import { ChangePasswordRequestPayload } from '../controllers/iam/change-password/change-password-request-payload';
import { authenticate } from '../middlewares/authenticate-middleware';
import changePasswordController from '../controllers/iam/change-password';

const app = express.Router();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
});

app.post('/login', limiter, validateRequest(LoginRequestModel), loginController);
app.post('/refresh-token', refreshTokenController);
app.post('/jwt-login', limiter, validateRequest(JWTLoginRequestModel), jwtLoginController);
app.post('/jwt-refresh-token', validateRequest(JWTRefreshTokenRequestModel), jwtRefreshTokenController);
app.post('/forgotten-password', limiter, validateRequest(ForgottenPasswordRequestModel), forgottenPasswordController);
app.post('/forgotten-password/confirm', validateRequest(ConfirmForgottenPasswordRequestModel), confirmForgottenPasswordController);
app.patch('/password', limiter, validateRequest(ChangePasswordRequestPayload), authenticate(), changePasswordController);
export default app;
