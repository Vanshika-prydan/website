import { container } from 'tsyringe';
import { EmployeeAvailabilityService } from '../../domain/services/employee-availability-service';

const employeeAvailabilityService = container.resolve(EmployeeAvailabilityService);

export default employeeAvailabilityService;
