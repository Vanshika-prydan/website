import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmployeeDefaultAvailability1629976155831 implements MigrationInterface {
    name = 'EmployeeDefaultAvailability1629976155831'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TYPE "employee_default_availability_day_enum" AS ENUM(\'MONDAY\', \'TUESDAY\', \'WEDNESDAY\', \'THURSDAY\', \'FRIDAY\', \'SATURDAY\', \'SUNDAY\')');
      await queryRunner.query('CREATE TABLE "employee_default_availability" ("employee_id" uuid NOT NULL, "day" "employee_default_availability_day_enum" NOT NULL, "start_hour" integer NOT NULL DEFAULT \'7\', "start_minute" integer NOT NULL DEFAULT \'0\', "end_hour" integer NOT NULL DEFAULT \'18\', "end_minute" integer NOT NULL DEFAULT \'0\', CONSTRAINT "PK_b32cf2b336f6442f5c55b536cbf" PRIMARY KEY ("employee_id", "day"))');
      await queryRunner.query('ALTER TABLE "employee_default_availability" ADD CONSTRAINT "FK_a8fdacbf5b027814d759ee843b1" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "employee_default_availability" DROP CONSTRAINT "FK_a8fdacbf5b027814d759ee843b1"');
      await queryRunner.query('DROP TABLE "employee_default_availability"');
      await queryRunner.query('DROP TYPE "employee_default_availability_day_enum"');
    }
}
