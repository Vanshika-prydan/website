import winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

const logger = winston.createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
  format: winston.format.json(),
  defaultMeta: {
    environment: process.env.NODE_ENV!,
    service: 'core-api',
  },
  /* transports: [
    new WinstonCloudWatch({
      awsRegion: 'eu-north-1',
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
      logGroupName: 'core-api-logging',
      logStreamName: process.env.NODE_ENV!,
    }),
  ], */
});
if (process.env.NODE_ENV! !== 'local')
  logger.add(
    new WinstonCloudWatch({
      awsRegion: 'eu-north-1',
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
      logGroupName: 'core-api-logging',
      logStreamName: process.env.NODE_ENV!,
      jsonMessage: true,
    }));

if (process.env.NODE_ENV !== 'production')
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));

export default logger;
