/* eslint-disable no-unreachable */
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';

import apiDocs from './routes/api-docs';
import customer from './routes/customer';
import employee from './routes/employee';
import iam from './routes/iam';
import booking from './routes/booking';
import account from './routes/account';
import healthcheck from './routes/healthcheck';
import payment from './routes/payment';
import waitingList from './routes/waiting-list';
import services from './routes/services';

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import { ensureHttpsConnectionsOnly } from './middlewares/ensure-https-connections';
import errorHandler from './middlewares/error-handler';

import newRequestLoggingMiddleware from './middlewares/new-request-logging.middleware';
import { setHeadersMiddleware } from './middlewares/set-headers-middleware';
import { routeNotFound } from './middlewares/route-not-found';
import { toobusyMiddleware } from './middlewares/too-busy-middleware.';

import helmet from 'helmet';
const app = express();
app.set('trust proxy', process.env.NODE_ENV !== 'local');

if (process.env.NODE_ENV !== 'local') {
  Sentry.init({
    dsn: 'https://89e1e743f9884ac5ad179a54f273f971@o719267.ingest.sentry.io/5781001',
    integrations: [
    // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
  });

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());

  app.use(helmet.hsts());
}

app.use(toobusyMiddleware);

// const whitelist = ['http://localhost:3000', 'https://backoffice-dev.cleangreen.se'];
/* const corsOptions: CorsOptions = {
  origin: (origin:string, callback) => {
    if (whitelist.includes(origin))
      callback(null, true);
    else
      callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}; */

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '1kb' }));
app.use(express.json({ limit: '1kb' }));
app.use(hpp());
app.use(helmet.hidePoweredBy());

app.use(setHeadersMiddleware);
app.use(ensureHttpsConnectionsOnly);
app.use(newRequestLoggingMiddleware);

app.use('/api-docs', apiDocs);
app.use('/customer', customer);
app.use('/employee', employee);
app.use('/iam', iam);
app.use('/booking', booking);
app.use('/account', account);
app.use('/health', healthcheck);
app.use('/payment', payment);
app.use('/waiting-list', waitingList);
app.use('/services', services);

if (process.env.NODE_ENV !== 'local') app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);
app.use(routeNotFound);

export default app;
