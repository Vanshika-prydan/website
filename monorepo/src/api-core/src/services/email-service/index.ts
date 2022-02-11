import { container } from 'tsyringe';
import EmailService, { EMAIL_PROVIDER_INTERFACE } from '../../domain/services/email-service';
import AWSSes from './aws-ses';

container.register(EMAIL_PROVIDER_INTERFACE, { useClass: AWSSes });
const emailService = container.resolve(EmailService);

export default emailService;
