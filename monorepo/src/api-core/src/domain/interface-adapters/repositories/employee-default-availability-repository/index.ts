import { EmployeeDefaultAvailability, EmployeeDefaultAvailabilityInterface } from '../../../entities/EmployeeDefaultAvailability';

export const EMPLOYEE_DEFAULT_AVAILABILITY_REPOSITORY_INTERFACE = 'EmployeeDefaultAvailabilityRepositoryInterface';

export interface SaveRequestPayload {
    employeeId: string;
    availability: EmployeeDefaultAvailability[];
}

export interface EmployeeDefaultAvailabilityRepositoryInterface {
    save(payload: SaveRequestPayload):Promise<void>;
    fetchByEmployee(employeeId:string):Promise<EmployeeDefaultAvailabilityInterface[]>;
    fetchAll():Promise<EmployeeDefaultAvailabilityInterface[]>;
}
