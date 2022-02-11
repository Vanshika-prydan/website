import { MigrationInterface, QueryRunner } from 'typeorm';

export class FrameBookingLight1632242309210 implements MigrationInterface {
    name = 'FrameBookingLight1632242309210'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "schema" = $2 AND "name" = $3', ['VIEW', 'public', 'booking_light']);
      await queryRunner.query('DROP VIEW "public"."booking_light"');
      await queryRunner.query('CREATE VIEW "booking_light" AS SELECT "booking_id" AS "bookingId", "employee_id" AS "employeeId", "start_time" AS "startTime", "end_time" AS "endTime", "cancelled_at" as "cancelledAt" from "booking"');
      await queryRunner.query('INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)', ['VIEW', 'public', 'booking_light', 'SELECT "booking_id" AS "bookingId", "employee_id" AS "employeeId", "start_time" AS "startTime", "end_time" AS "endTime", "cancelled_at" as "cancelledAt" from "booking"']);
      await queryRunner.query(`CREATE VIEW "frame_booking_light" AS SELECT
    "frame_booking_id" as "frameBookingId",
    "start_time" as "startTime",
    "duration_in_minutes" as "durationInMinutes",
     "end_time" as "endTime",
     "occurrence" as "occurrence",
    "customer_id" as "customerId",
    "address_id" as "addressId",
    "employee_id" as "employeeId",
    "booking_type_id" as "bookingTypeId"
    FROM frame_booking;
    `);
      await queryRunner.query('INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)', ['VIEW', 'public', 'frame_booking_light', 'SELECT\n    "frame_booking_id" as "frameBookingId",\n    "start_time" as "startTime",\n    "duration_in_minutes" as "durationInMinutes",\n     "end_time" as "endTime",\n     "occurrence" as "occurrence",\n    "customer_id" as "customerId",\n    "address_id" as "addressId",\n    "employee_id" as "employeeId",\n    "booking_type_id" as "bookingTypeId"\n    FROM frame_booking;']);
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "schema" = $2 AND "name" = $3', ['VIEW', 'public', 'frame_booking_light']);
      await queryRunner.query('DROP VIEW "frame_booking_light"');
      await queryRunner.query('DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "schema" = $2 AND "name" = $3', ['VIEW', 'public', 'booking_light']);
      await queryRunner.query('DROP VIEW "booking_light"');
      await queryRunner.query('CREATE VIEW "public"."booking_light" AS SELECT "booking_id" AS "bookingId", "employee_id" AS "employeeId", "start_time" AS "startTime", "end_time" AS "endTime" from "booking"');
      await queryRunner.query('INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)', ['VIEW', 'public', 'booking_light', 'SELECT "booking_id" AS "bookingId", "employee_id" AS "employeeId", "start_time" AS "startTime", "end_time" AS "endTime" from "booking"']);
    }
}
