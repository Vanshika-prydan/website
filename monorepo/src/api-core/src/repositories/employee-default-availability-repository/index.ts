import { getManager, getRepository } from 'typeorm';
import EmployeeDefaultAvailability from '../../database/entities/EmployeeDefaultAvailability';
import { ErrorCode } from '../../domain/entities/ErrorCode';
import { EmployeeDefaultAvailabilityRepositoryInterface, SaveRequestPayload } from '../../domain/interface-adapters/repositories/employee-default-availability-repository';

export default class EmployeeDefaultAvailabilityRepository implements EmployeeDefaultAvailabilityRepositoryInterface {
  fetchAll (): Promise<EmployeeDefaultAvailability[]> {
    return getRepository(EmployeeDefaultAvailability).find();
  }

  async save (payload: SaveRequestPayload): Promise<void> {
    await getManager().transaction(async transactionalEntityManager => {
      try {
        await transactionalEntityManager
          .createQueryBuilder()
          .delete()
          .from(EmployeeDefaultAvailability)
          .where('employee_id = :employee_id', { employee_id: payload.employeeId })
          .execute();

        await transactionalEntityManager.getRepository(EmployeeDefaultAvailability).save(payload.availability);
      } catch (e) {
        throw new Error(ErrorCode.CONSTRAINT_VIOLATED);
      }
    });
  }

  fetchByEmployee (employeeId: string): Promise<EmployeeDefaultAvailability[]> {
    return getManager().getRepository(EmployeeDefaultAvailability).find({ where: { employeeId } });
  }
}
