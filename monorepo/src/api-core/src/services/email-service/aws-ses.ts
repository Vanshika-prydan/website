import { injectable } from 'tsyringe';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import AWS from 'aws-sdk';
import * as Sentry from '@sentry/node';
import { EmailProvider } from '../../domain/services/email-service';

AWS.config.credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
};

const FROM_EMAIL_ADDRESS = process.env.SEND_EMAIL_ADDRESS;
if (!FROM_EMAIL_ADDRESS) throw new Error('Incorrect email configuration');

const AWS_REGION = 'eu-north-1';
const sesClient = new SESClient({ region: AWS_REGION });

@injectable()
export default class AWSSes implements EmailProvider {
  async send (toEmail: string, subject: string, content: string, textContent?:string): Promise<void> {
    const params = {
      Destination: {
        CcAddresses: [
        ],
        ToAddresses: [
          toEmail,
        ],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: content,
          },
          Text: {
            Charset: 'UTF-8',
            Data: textContent ?? '',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: FROM_EMAIL_ADDRESS,
      ReplyToAddresses: [
        'info@cleangreen.se',
      ],
    };

    const run = async () => {
      try {
        const data = await sesClient.send(new SendEmailCommand(params));
        console.log('Success', data);
        return data; // For unit tests.
      } catch (err) {
        if (process.env.NODE_ENV !== 'local') Sentry.captureException(err);
        console.log('Error', err);
      }
    };
    await run();
    return Promise.resolve();
  }
}
