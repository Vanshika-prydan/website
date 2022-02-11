import { inject, injectable } from 'tsyringe';
import { BOOKING_REPOSITORY_INTERFACE, IBookingRepository } from '../../../interface-adapters/repositories/booking-repository';
import EmailService from '../../../services/email-service';
import isToday from 'date-fns/isToday';
import { format } from 'date-fns';

@injectable()
export default class EmployeeEmailerFacade {
  constructor (
      private readonly emailService: EmailService,
     @inject(BOOKING_REPOSITORY_INTERFACE) private readonly bookingRepository: IBookingRepository,
  ) {}

  async execute (): Promise<void> {
    const allBookings = await this.bookingRepository.getAll();
    const bookings = allBookings.filter(b => isToday(b.startTime));
    bookings.forEach(b => {
      const title = `We Clean Green - Beskrivning av städning kl ${format(b.startTime, 'd/M HH:mm')} - ${format(b.endTime, 'HH:mm')}`;
      const message = `
      <div>
          Tid: ${format(b.startTime, 'HH:mm')} - ${format(b.endTime, 'HH:mm')}\n\n
          <br>
          <br>
              Adress: ${b.address.street}, ${b.address.postalCode} ${b.address.postalCity}. \n
              <br>
      
              Kod: ${b.address.code || 'Ingen kod'}
              <br><br>Information: ${b.specialInstructions}\n\n
      <br>
      <br>
              Kund: ${b.customer.account.firstName} ${b.customer.account.lastName} ${b.customer.account.email} ${b.customer.account.phoneNumber ?? ''} \n\n 
              <br>
              <br>
      
              Typ av tjänst: ${b.bookingType.name}\n
              <br><br>
              Tillägg: ${b.addons?.map(a => `<br>-${a.addon.name}`) ?? 'Inga tillägg'} 
          
      </div>`;
      this.emailService.send(b.employee.account.email, title, message);
    });
  }
}
