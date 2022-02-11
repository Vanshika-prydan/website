import { MigrationInterface, QueryRunner } from 'typeorm';

export class BookingLightUpdate1632298017193 implements MigrationInterface {
    name = 'BookingLightUpdate1632298017193'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "schema" = $2 AND "name" = $3', ['VIEW', 'public', 'booking_light']);
      await queryRunner.query('DROP VIEW "public"."booking_light"');
      await queryRunner.query(`CREATE VIEW "booking_light" AS SELECT
  "booking_id" AS "bookingId",
  "employee_id" AS "employeeId",
  "start_time" AS "startTime",
  "end_time" AS "endTime",
  "cancelled_at" AS "cancelledAt",
  "frame_booking_id" AS "frameBookingId",
  "customer_id" AS "customerId",
  "address_id" AS "addressId",
  "private_notes" AS "privateNotes",
  "special_instructions" AS "specialInstructions",
  "booking_type_id" AS "bookingTypeId",
  "completed" AS "completed",
  "payment_completed" AS "paymentCompleted",
  "stripe_payment_id" AS "stripePaymentId"
  from "booking"`);
      await queryRunner.query('INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)', ['VIEW', 'public', 'booking_light', 'SELECT\n  "booking_id" AS "bookingId",\n  "employee_id" AS "employeeId",\n  "start_time" AS "startTime",\n  "end_time" AS "endTime",\n  "cancelled_at" AS "cancelledAt",\n  "frame_booking_id" AS "frameBookingId",\n  "customer_id" AS "customerId",\n  "address_id" AS "addressId",\n  "private_notes" AS "privateNotes",\n  "special_instructions" AS "specialInstructions",\n  "booking_type_id" AS "bookingTypeId",\n  "completed" AS "completed",\n  "payment_completed" AS "paymentCompleted",\n  "stripe_payment_id" AS "stripePaymentId"\n  from "booking"']);
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "schema" = $2 AND "name" = $3', ['VIEW', 'public', 'booking_light']);
      await queryRunner.query('DROP VIEW "booking_light"');
      await queryRunner.query('CREATE VIEW "public"."booking_light" AS SELECT "booking_id" AS "bookingId", "employee_id" AS "employeeId", "start_time" AS "startTime", "end_time" AS "endTime", "cancelled_at" as "cancelledAt" from "booking"');
      await queryRunner.query('INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)', ['VIEW', 'public', 'booking_light', 'SELECT "booking_id" AS "bookingId", "employee_id" AS "employeeId", "start_time" AS "startTime", "end_time" AS "endTime", "cancelled_at" as "cancelledAt" from "booking"']);
    }
}
