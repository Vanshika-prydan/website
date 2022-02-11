import { container } from 'tsyringe';
import EmployeeEmailerFacade from '../../../../domain/interactors/services/employee-emailer';
import { BOOKING_REPOSITORY_INTERFACE } from '../../../../domain/interface-adapters/repositories/booking-repository';
import { EMAIL_PROVIDER_INTERFACE } from '../../../../domain/services/email-service';
import { BookingRepository } from '../../../../repositories/booking-repository/booking-repository';
import AWSSes from '../../../../services/email-service/aws-ses';
import buildEmployeeEmailerController from './buildEmployeeEmailerController';

container.register(EMAIL_PROVIDER_INTERFACE, { useClass: AWSSes }).register(BOOKING_REPOSITORY_INTERFACE, { useClass: BookingRepository });

const employeeEmailerFacade = container.resolve(EmployeeEmailerFacade);

const employeeEmailerController = buildEmployeeEmailerController(employeeEmailerFacade);
export default employeeEmailerController;
