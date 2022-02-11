import { container } from 'tsyringe';
import NewBookingNotificationService from '.';
import { MockBooking } from '../../../entities/Booking';
import { MockFrameBooking } from '../../../entities/FrameBooking';
import { FrameBookingFullyDefined } from '../../../entities/FrameBooking/IFrameBooking';
import EmailService from '../../email-service';

describe('new-booking-notification-service', () => {
  let emailService: EmailService;

  const booking = new MockBooking({ startTime: new Date('2022-01-01T12:00:00.000Z') });
  const frameBooking = new MockFrameBooking({ startTime: new Date('2022-01-01T12:00:00.000Z'), occurrence: 'biweekly' });
  let service: NewBookingNotificationService;

  beforeEach(() => {
    container.clearInstances();
    // @ts-ignore
    emailService = { send: jest.fn(() => Promise.resolve()) };
    container.register(EmailService, { useValue: emailService });
    service = container.resolve(NewBookingNotificationService);
  });
  afterAll(() => {
    container.clearInstances();
  });

  it('should generate a text with a one-time booking', () => {
    expect(service.generateMessage(booking)).toBe(`<h1>New booking registered!</h1>
Type of booking: One-time booking
When: January 1st at January 1st 13:00<br><br>
Visit <a href="https://backoffice.cleangreen.se">https://backoffice.cleangreen.se</a> to read more.`);
  });

  it('should generate a text with a frame booking', () => {
    expect(service.generateMessage(frameBooking as FrameBookingFullyDefined)).toBe(`<h1>New booking registered!</h1>
Type of booking: Frame booking
When: January 1st at January 1st 13:00<br><br>
Visit <a href="https://backoffice.cleangreen.se">https://backoffice.cleangreen.se</a> to read more.`);
  });
});
