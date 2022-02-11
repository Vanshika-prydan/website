import { inject, injectable } from 'tsyringe';
import { emailTemplate } from './templates';

export const EMAIL_PROVIDER_INTERFACE = 'EmailProvider';
export interface EmailProvider {
    send(toEmail: string, subject:string, content: string, textContent?: string):Promise<void>;
}

@injectable()
export default class EmailService {
  constructor (@inject(EMAIL_PROVIDER_INTERFACE) private provider: EmailProvider) {}

  send (toEmail: string, subject: string, content: string, textContent?: string):Promise<void> {
    const htmlTemplateWithContent = emailTemplate(subject, content);
    return this.provider.send(toEmail, subject, htmlTemplateWithContent, textContent);
  }
}
