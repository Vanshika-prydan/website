import { container, injectable } from 'tsyringe';
import { Level, ServerNotificationService } from '../../domain/interface-adapters/gateways/server-notification-service';
import logger from '../../utilities/logging';

import AWS from '../aws';

@injectable()
export class AWSSNS implements ServerNotificationService {
  async send (message: string, level: Level = 'INFO'): Promise<void> {
    const params = {
      Message: message,
      TopicArn: `arn:aws:sns:eu-north-1:620181086901:SERVER_NOTIFICATIONS_${process.env.NODE_ENV!.toUpperCase()}`,
    };
    console.log(params.TopicArn);

    try {
      await new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
    } catch (err) {
      // @ts-ignore
      logger(err);
    }
  }
}
const serverNotificationService = container.resolve(AWSSNS);
export default serverNotificationService;
