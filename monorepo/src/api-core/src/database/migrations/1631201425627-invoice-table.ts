import { MigrationInterface, QueryRunner } from 'typeorm';

export class invoiceTable1631201425627 implements MigrationInterface {
    name = 'invoiceTable1631201425627'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."employee" DROP CONSTRAINT "FK_ad6f816c5fd4573342f870d4d28"');
      await queryRunner.query('ALTER TABLE "public"."employee" RENAME COLUMN "address" TO "address_id"');
      await queryRunner.query('ALTER TABLE "public"."employee" RENAME CONSTRAINT "REL_ad6f816c5fd4573342f870d4d2" TO "UQ_2a4f5082f1be346e2b8cdec2194"');
      await queryRunner.query('CREATE TABLE "invoice" ("invoice_id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "price_in_ore" integer NOT NULL, "price_in_ore_inc_vat" integer NOT NULL, "booking_id" uuid NOT NULL, CONSTRAINT "REL_ee283c9adbadc5f1a2ff392eee" UNIQUE ("booking_id"), CONSTRAINT "PK_a7e64c304165d9e5dfa274f18d9" PRIMARY KEY ("invoice_id"))');
      await queryRunner.query('ALTER TYPE "public"."employee_default_availability_day_enum" RENAME TO "employee_default_availability_day_enum_old"');
      await queryRunner.query('CREATE TYPE "public"."week_day" AS ENUM(\'MONDAY\', \'TUESDAY\', \'WEDNESDAY\', \'THURSDAY\', \'FRIDAY\', \'SATURDAY\', \'SUNDAY\')');
      await queryRunner.query('ALTER TABLE "public"."employee_default_availability" ALTER COLUMN "day" TYPE "public"."week_day" USING "day"::"text"::"public"."week_day"');
      await queryRunner.query('DROP TYPE "public"."employee_default_availability_day_enum_old"');
      await queryRunner.query('ALTER TABLE "public"."employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "invoice" ADD CONSTRAINT "FK_ee283c9adbadc5f1a2ff392eee5" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "invoice" DROP CONSTRAINT "FK_ee283c9adbadc5f1a2ff392eee5"');
      await queryRunner.query('ALTER TABLE "public"."employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"');
      await queryRunner.query('CREATE TYPE "public"."employee_default_availability_day_enum_old" AS ENUM(\'MONDAY\', \'TUESDAY\', \'WEDNESDAY\', \'THURSDAY\', \'FRIDAY\', \'SATURDAY\', \'SUNDAY\')');
      await queryRunner.query('ALTER TABLE "public"."employee_default_availability" ALTER COLUMN "day" TYPE "public"."employee_default_availability_day_enum_old" USING "day"::"text"::"public"."employee_default_availability_day_enum_old"');
      await queryRunner.query('DROP TYPE "public"."week_day"');
      await queryRunner.query('ALTER TYPE "public"."employee_default_availability_day_enum_old" RENAME TO "employee_default_availability_day_enum"');
      await queryRunner.query('DROP TABLE "invoice"');
      await queryRunner.query('ALTER TABLE "public"."employee" RENAME CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194" TO "REL_ad6f816c5fd4573342f870d4d2"');
      await queryRunner.query('ALTER TABLE "public"."employee" RENAME COLUMN "address_id" TO "address"');
      await queryRunner.query('ALTER TABLE "public"."employee" ADD CONSTRAINT "FK_ad6f816c5fd4573342f870d4d28" FOREIGN KEY ("address") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
}
