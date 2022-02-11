import { MigrationInterface, QueryRunner } from 'typeorm';

export class productionSetup1628749331480 implements MigrationInterface {
    name = 'productionSetup1628749331480'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "permission" ("permission" text NOT NULL, CONSTRAINT "PK_573c75687effc7acabc05d4f6b7" PRIMARY KEY ("permission"))');
      await queryRunner.query('CREATE TABLE "role" ("name" character varying(40) NOT NULL, "description" character varying(1000) NOT NULL, CONSTRAINT "PK_ae4578dcaed5adff96595e61660" PRIMARY KEY ("name"))');
      await queryRunner.query('CREATE TABLE "account" ("account_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(50) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(60), "phone_number" character varying(20), "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "personal_identity_number" character varying(20), CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "UQ_5eea76fd43120cb5689eacd3a95" UNIQUE ("phone_number"), CONSTRAINT "UQ_bf43810df4ce4069ace7c82c2ea" UNIQUE ("personal_identity_number"), CONSTRAINT "PK_ea08b54a9d7322975ffc57fc612" PRIMARY KEY ("account_id"))');
      await queryRunner.query('CREATE TABLE "address" ("address_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(100) NOT NULL, "postal_code" character varying(5) NOT NULL, "country_code" character varying(2) NOT NULL, "postal_city" character varying(50) NOT NULL, "address_name" character varying(40), "information" character varying(2000), "code" character varying(20), CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" PRIMARY KEY ("address_id"))');
      await queryRunner.query('CREATE TABLE "addon" ("addon_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(1000) NOT NULL, "unit" character varying(20) NOT NULL, "default_time_in_minutes" integer NOT NULL, CONSTRAINT "PK_c891644481c410013164cc548ad" PRIMARY KEY ("addon_id"))');
      await queryRunner.query('CREATE TABLE "customer_address" ("customer_address_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_primary_address" boolean NOT NULL DEFAULT true, "number_of_bathrooms" integer, "home_area_in_m2" integer, "address_id" uuid NOT NULL, "customer_id" uuid NOT NULL, CONSTRAINT "REL_828d011dfc2694eb74cbe93f90" UNIQUE ("address_id"), CONSTRAINT "PK_3a2caed39c30764d49cb476b113" PRIMARY KEY ("customer_address_id"))');
      await queryRunner.query('CREATE TABLE "customer" ("customer_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "receive_marketing_communication" boolean NOT NULL DEFAULT false, "stripe_id" character varying, "account_id" uuid NOT NULL, CONSTRAINT "REL_875fa8dea881cc80d36eb5e0c6" UNIQUE ("account_id"), CONSTRAINT "PK_cde3d123fc6077bcd75eb051226" PRIMARY KEY ("customer_id"))');
      await queryRunner.query('CREATE TABLE "employee" ("employee_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "account_id" uuid NOT NULL, "address" uuid, CONSTRAINT "REL_f92b141ca4b0ca2defc719674c" UNIQUE ("account_id"), CONSTRAINT "REL_ad6f816c5fd4573342f870d4d2" UNIQUE ("address"), CONSTRAINT "PK_f9d306b968b54923539b3936b03" PRIMARY KEY ("employee_id"))');
      await queryRunner.query('CREATE TABLE "booking_addon" ("booking_addon_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number_of_units" integer NOT NULL DEFAULT \'1\', "addon_id" uuid, "booking_id" uuid, CONSTRAINT "PK_50ec08c4daaa313ed66af86cd72" PRIMARY KEY ("booking_addon_id"))');
      await queryRunner.query('CREATE TABLE "booking_type" ("booking_type_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(10000), CONSTRAINT "UQ_1da86ef636f7cd21c53df98ce95" UNIQUE ("name"), CONSTRAINT "PK_abb6eaacaa3d79b32f7792aacbb" PRIMARY KEY ("booking_type_id"))');
      await queryRunner.query('CREATE TABLE "frame_booking_addon" ("frame_booking_addon_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number_of_units" integer NOT NULL DEFAULT \'1\', "addon_id" uuid NOT NULL, "frame_booking_id" uuid NOT NULL, CONSTRAINT "PK_d3caf212dd8561e707d7093d44d" PRIMARY KEY ("frame_booking_addon_id"))');
      await queryRunner.query('CREATE TABLE "frame_booking" ("frame_booking_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_time" TIMESTAMP NOT NULL, "duration_in_minutes" integer NOT NULL, "end_time" TIMESTAMP, "occurrence" character varying NOT NULL, "private_notes" character varying, "special_instructions" character varying, "customer_id" uuid, "address_id" uuid, "employee_id" uuid, "booking_type_id" uuid, CONSTRAINT "PK_fe721fb8f15571532ae419e4845" PRIMARY KEY ("frame_booking_id"))');
      await queryRunner.query('CREATE TABLE "booking" ("booking_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP NOT NULL, "private_notes" character varying(1000), "special_instructions" character varying(1000), "completed" boolean NOT NULL DEFAULT false, "payment_completed" boolean NOT NULL DEFAULT false, "stripe_payment_id" character varying, "cancelled_at" TIMESTAMP, "frame_booking_id" uuid, "customer_id" uuid NOT NULL, "address_id" uuid NOT NULL, "employee_id" uuid NOT NULL, "booking_type_id" uuid NOT NULL, CONSTRAINT "PK_9ecc24640e39cd493c318a117f1" PRIMARY KEY ("booking_id"))');
      await queryRunner.query('CREATE TABLE "account_notification" ("account_notification_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "account_id" uuid, CONSTRAINT "PK_9f7387067b3d8006486647c85da" PRIMARY KEY ("account_notification_id"))');
      await queryRunner.query('CREATE TABLE "reset_password_code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "account_id" character varying NOT NULL, "token" character varying NOT NULL, "code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3a2d473df1ab15476d9d7c2db5d" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "waiting_list" ("waiting_list_entity_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "postalCode" character varying NOT NULL, CONSTRAINT "PK_d48a7854c6552cf3a971f421785" PRIMARY KEY ("waiting_list_entity_id"))');
      await queryRunner.query('CREATE TABLE "role_permissions" ("role" character varying(40) NOT NULL, "permission" text NOT NULL, CONSTRAINT "PK_9c116ac03805ca80baf3e8d2319" PRIMARY KEY ("role", "permission"))');
      await queryRunner.query('CREATE INDEX "IDX_5d5086bd299f773d403574cf1c" ON "role_permissions" ("role") ');
      await queryRunner.query('CREATE INDEX "IDX_0ab5175ebb91e7a07f850acf42" ON "role_permissions" ("permission") ');
      await queryRunner.query('CREATE TABLE "account_roles" ("account_id" uuid NOT NULL, "role" character varying(40) NOT NULL, CONSTRAINT "PK_0f65631e8f59fdb69be275778d4" PRIMARY KEY ("account_id", "role"))');
      await queryRunner.query('CREATE INDEX "IDX_0e94d53a5ed46deaae79475e42" ON "account_roles" ("account_id") ');
      await queryRunner.query('CREATE INDEX "IDX_b20890f0e32da210b6beac11ab" ON "account_roles" ("role") ');
      await queryRunner.query('ALTER TABLE "customer_address" ADD CONSTRAINT "FK_828d011dfc2694eb74cbe93f904" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "customer_address" ADD CONSTRAINT "FK_1f5ed21a5f3390cdbafb6f22452" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "customer" ADD CONSTRAINT "FK_875fa8dea881cc80d36eb5e0c68" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "employee" ADD CONSTRAINT "FK_f92b141ca4b0ca2defc719674cc" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "employee" ADD CONSTRAINT "FK_ad6f816c5fd4573342f870d4d28" FOREIGN KEY ("address") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "booking_addon" ADD CONSTRAINT "FK_148fdfd2da5d5abb7d11e2c61a0" FOREIGN KEY ("addon_id") REFERENCES "addon"("addon_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "booking_addon" ADD CONSTRAINT "FK_3965230830f9cf89729c7a6dc7e" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "frame_booking_addon" ADD CONSTRAINT "FK_a7ed82425968d680da4a7491877" FOREIGN KEY ("addon_id") REFERENCES "addon"("addon_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "frame_booking_addon" ADD CONSTRAINT "FK_dae70428b7a019e8b5f900bcd3e" FOREIGN KEY ("frame_booking_id") REFERENCES "frame_booking"("frame_booking_id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "frame_booking" ADD CONSTRAINT "FK_e66f6bd35cd916e2ba6bce84752" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "frame_booking" ADD CONSTRAINT "FK_d7b7486b367205c73b1a1038844" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "frame_booking" ADD CONSTRAINT "FK_45bab078e7e8bdc778cae913ae8" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "frame_booking" ADD CONSTRAINT "FK_3fc93ffb0cf98dc90788f6de9db" FOREIGN KEY ("booking_type_id") REFERENCES "booking_type"("booking_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "booking" ADD CONSTRAINT "FK_cdeb310da769dbe5221c1d132ce" FOREIGN KEY ("frame_booking_id") REFERENCES "frame_booking"("frame_booking_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "booking" ADD CONSTRAINT "FK_ae80346292fa587731a5d2546e6" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "booking" ADD CONSTRAINT "FK_d1462ec33cc046536ad433d421b" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "booking" ADD CONSTRAINT "FK_ddeea2dd0dfa9414959dec60f80" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "booking" ADD CONSTRAINT "FK_9ed9eb732457a84228814d72517" FOREIGN KEY ("booking_type_id") REFERENCES "booking_type"("booking_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "account_notification" ADD CONSTRAINT "FK_c67754ac85ed314854bcd993d03" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_5d5086bd299f773d403574cf1c8" FOREIGN KEY ("role") REFERENCES "role"("name") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_0ab5175ebb91e7a07f850acf42e" FOREIGN KEY ("permission") REFERENCES "permission"("permission") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "account_roles" ADD CONSTRAINT "FK_0e94d53a5ed46deaae79475e427" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "account_roles" ADD CONSTRAINT "FK_b20890f0e32da210b6beac11abe" FOREIGN KEY ("role") REFERENCES "role"("name") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('CREATE VIEW "booking_light" AS SELECT "booking_id" AS "bookingId", "employee_id" AS "employeeId", "start_time" AS "startTime", "end_time" AS "endTime" from "booking"');
      await queryRunner.query('INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)', ['VIEW', 'public', 'booking_light', 'SELECT "booking_id" AS "bookingId", "employee_id" AS "employeeId", "start_time" AS "startTime", "end_time" AS "endTime" from "booking"']);
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELETE FROM "typeorm_metadata" WHERE "type" = \'VIEW\' AND "schema" = $1 AND "name" = $2', ['public', 'booking_light']);
      await queryRunner.query('DROP VIEW "booking_light"');
      await queryRunner.query('ALTER TABLE "account_roles" DROP CONSTRAINT "FK_b20890f0e32da210b6beac11abe"');
      await queryRunner.query('ALTER TABLE "account_roles" DROP CONSTRAINT "FK_0e94d53a5ed46deaae79475e427"');
      await queryRunner.query('ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_0ab5175ebb91e7a07f850acf42e"');
      await queryRunner.query('ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_5d5086bd299f773d403574cf1c8"');
      await queryRunner.query('ALTER TABLE "account_notification" DROP CONSTRAINT "FK_c67754ac85ed314854bcd993d03"');
      await queryRunner.query('ALTER TABLE "booking" DROP CONSTRAINT "FK_9ed9eb732457a84228814d72517"');
      await queryRunner.query('ALTER TABLE "booking" DROP CONSTRAINT "FK_ddeea2dd0dfa9414959dec60f80"');
      await queryRunner.query('ALTER TABLE "booking" DROP CONSTRAINT "FK_d1462ec33cc046536ad433d421b"');
      await queryRunner.query('ALTER TABLE "booking" DROP CONSTRAINT "FK_ae80346292fa587731a5d2546e6"');
      await queryRunner.query('ALTER TABLE "booking" DROP CONSTRAINT "FK_cdeb310da769dbe5221c1d132ce"');
      await queryRunner.query('ALTER TABLE "frame_booking" DROP CONSTRAINT "FK_3fc93ffb0cf98dc90788f6de9db"');
      await queryRunner.query('ALTER TABLE "frame_booking" DROP CONSTRAINT "FK_45bab078e7e8bdc778cae913ae8"');
      await queryRunner.query('ALTER TABLE "frame_booking" DROP CONSTRAINT "FK_d7b7486b367205c73b1a1038844"');
      await queryRunner.query('ALTER TABLE "frame_booking" DROP CONSTRAINT "FK_e66f6bd35cd916e2ba6bce84752"');
      await queryRunner.query('ALTER TABLE "frame_booking_addon" DROP CONSTRAINT "FK_dae70428b7a019e8b5f900bcd3e"');
      await queryRunner.query('ALTER TABLE "frame_booking_addon" DROP CONSTRAINT "FK_a7ed82425968d680da4a7491877"');
      await queryRunner.query('ALTER TABLE "booking_addon" DROP CONSTRAINT "FK_3965230830f9cf89729c7a6dc7e"');
      await queryRunner.query('ALTER TABLE "booking_addon" DROP CONSTRAINT "FK_148fdfd2da5d5abb7d11e2c61a0"');
      await queryRunner.query('ALTER TABLE "employee" DROP CONSTRAINT "FK_ad6f816c5fd4573342f870d4d28"');
      await queryRunner.query('ALTER TABLE "employee" DROP CONSTRAINT "FK_f92b141ca4b0ca2defc719674cc"');
      await queryRunner.query('ALTER TABLE "customer" DROP CONSTRAINT "FK_875fa8dea881cc80d36eb5e0c68"');
      await queryRunner.query('ALTER TABLE "customer_address" DROP CONSTRAINT "FK_1f5ed21a5f3390cdbafb6f22452"');
      await queryRunner.query('ALTER TABLE "customer_address" DROP CONSTRAINT "FK_828d011dfc2694eb74cbe93f904"');
      await queryRunner.query('DROP INDEX "IDX_b20890f0e32da210b6beac11ab"');
      await queryRunner.query('DROP INDEX "IDX_0e94d53a5ed46deaae79475e42"');
      await queryRunner.query('DROP TABLE "account_roles"');
      await queryRunner.query('DROP INDEX "IDX_0ab5175ebb91e7a07f850acf42"');
      await queryRunner.query('DROP INDEX "IDX_5d5086bd299f773d403574cf1c"');
      await queryRunner.query('DROP TABLE "role_permissions"');
      await queryRunner.query('DROP TABLE "waiting_list"');
      await queryRunner.query('DROP TABLE "reset_password_code"');
      await queryRunner.query('DROP TABLE "account_notification"');
      await queryRunner.query('DROP TABLE "booking"');
      await queryRunner.query('DROP TABLE "frame_booking"');
      await queryRunner.query('DROP TABLE "frame_booking_addon"');
      await queryRunner.query('DROP TABLE "booking_type"');
      await queryRunner.query('DROP TABLE "booking_addon"');
      await queryRunner.query('DROP TABLE "employee"');
      await queryRunner.query('DROP TABLE "customer"');
      await queryRunner.query('DROP TABLE "customer_address"');
      await queryRunner.query('DROP TABLE "addon"');
      await queryRunner.query('DROP TABLE "address"');
      await queryRunner.query('DROP TABLE "account"');
      await queryRunner.query('DROP TABLE "role"');
      await queryRunner.query('DROP TABLE "permission"');
    }
}
