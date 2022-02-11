import http from 'http';
import { createConnection } from 'typeorm';
import { setupDatabase } from '../database/seeds';
import app from './express';
import { verifyEnvironmentOrFail } from './verify-environment';
import * as Sentry from '@sentry/node';
import logger from '../utilities/logging';
import toobusy from 'toobusy-js';
import serverNotificationService from '../services/server-notification-service';

try {
  verifyEnvironmentOrFail();
  logger.info('Environment check ok');
} catch (e) {
  if (process.env.NODE_ENV !== 'local') Sentry.captureException(e);
  logger.error('Missing environment variables in setup', e);

  // @ts-ignore
  serverNotificationService.send('MISSING ENVIRONMENT VARIABLES IN API-CORE', 'ERROR');
}

if (process.env.NODE_ENV !== 'local')
  Sentry.init({
    dsn: 'https://89e1e743f9884ac5ad179a54f273f971@o719267.ingest.sentry.io/5781001',
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
  });

createConnection().then(async connection => {
  const PORT = process.env.PORT || 8080;
  try {
    await setupDatabase();
  } catch (e) {
    logger.error('ERROR WHILE SETTING UP INITIAL DATABASE VALUES', e);
    if (process.env.NODE_ENV !== 'local') Sentry.captureException(e);
    logger.error('Could not set up the database', e);
    // @ts-ignore
    serverNotificationService.send(`API-CORE COULD NOT SETUP INITIAL VALUES IN DB. Error: ${e.message}`, 'ERROR');
  }
  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    logger.info(`SERVER IS RUNNING ON PORT ${PORT} (${process.env.NODE_ENV})`);
  });
  process.on('SIGINT', async () => {
    httpServer.close();
    toobusy.shutdown();
    await connection.close();
    process.exit();
  });
}).catch(e => {
  serverNotificationService.send(`API-CORE COULD NOT CONNECT TO THE DATABASE. Error: ${e.message}`, 'ERROR');
  if (process.env.NODE_ENV !== 'local') Sentry.captureException(e);
  logger.error('COULD NOT CONNECT TO THE DATABASE', e);
});
