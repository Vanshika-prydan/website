import { format } from 'date-fns';
import { injectable } from 'tsyringe';
import { BookingFullyDefined } from '../../../entities/Booking';
import { FrameBookingFullyDefined } from '../../../entities/FrameBooking/IFrameBooking';
import EmailService from '../../email-service';

@injectable()
export default class NewBookingNotificationService {
  constructor (
        private readonly emailService: EmailService,
  ) {}

  public generateMessage (booking:FrameBookingFullyDefined | BookingFullyDefined):string {
    const domain = 'https://backoffice.cleangreen.se';
    const str = `<h1>New booking registered!</h1>
Type of booking: ${(booking as FrameBookingFullyDefined).occurrence ? 'Frame booking' : 'One-time booking'}
When: ${format(booking.startTime, 'MMMM Do')} at ${format(booking.startTime, 'MMMM Do HH:mm')}<br><br>
Visit <a href="${domain}">${domain}</a> to read more.`;

    return str;
  }

  public async execute (booking: FrameBookingFullyDefined | BookingFullyDefined):Promise<void> {
    const message = this.generateMessage(booking);
    const addresses = [process.env.NODE_ENV === 'production' ? 'floyd@cleangreen.se' : 'niklas@cleangreen.se', booking.employee.account.email];

    const allEmailRequests: Promise<void>[] = [];
    for (const a of addresses) allEmailRequests.push(this.emailService.send(a, 'New system booking', message));
    await Promise.all(allEmailRequests);
  }
}
