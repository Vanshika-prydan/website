import {MigrationInterface, QueryRunner} from "typeorm";

export class addingNotNullConstraintsToFrameBooking1632293383521 implements MigrationInterface {
    name = 'addingNotNullConstraintsToFrameBooking1632293383521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."role_permissions" DROP CONSTRAINT "FK_5d5086bd299f773d403574cf1c8"`);
        await queryRunner.query(`ALTER TABLE "public"."role_permissions" DROP CONSTRAINT "FK_0ab5175ebb91e7a07f850acf42e"`);
        await queryRunner.query(`ALTER TABLE "public"."account_roles" DROP CONSTRAINT "FK_0e94d53a5ed46deaae79475e427"`);
        await queryRunner.query(`ALTER TABLE "public"."account_roles" DROP CONSTRAINT "FK_b20890f0e32da210b6beac11abe"`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" DROP CONSTRAINT "FK_e66f6bd35cd916e2ba6bce84752"`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" DROP CONSTRAINT "FK_d7b7486b367205c73b1a1038844"`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" DROP CONSTRAINT "FK_45bab078e7e8bdc778cae913ae8"`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" DROP CONSTRAINT "FK_3fc93ffb0cf98dc90788f6de9db"`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ALTER COLUMN "customer_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ALTER COLUMN "address_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ALTER COLUMN "employee_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ALTER COLUMN "booking_type_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ADD CONSTRAINT "FK_e66f6bd35cd916e2ba6bce84752" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ADD CONSTRAINT "FK_d7b7486b367205c73b1a1038844" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ADD CONSTRAINT "FK_45bab078e7e8bdc778cae913ae8" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ADD CONSTRAINT "FK_3fc93ffb0cf98dc90788f6de9db" FOREIGN KEY ("booking_type_id") REFERENCES "booking_type"("booking_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "FK_5d5086bd299f773d403574cf1c8" FOREIGN KEY ("role") REFERENCES "role"("name") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "FK_0ab5175ebb91e7a07f850acf42e" FOREIGN KEY ("permission") REFERENCES "permission"("permission") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."account_roles" ADD CONSTRAINT "FK_0e94d53a5ed46deaae79475e427" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."account_roles" ADD CONSTRAINT "FK_b20890f0e32da210b6beac11abe" FOREIGN KEY ("role") REFERENCES "role"("name") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."account_roles" DROP CONSTRAINT "FK_b20890f0e32da210b6beac11abe"`);
        await queryRunner.query(`ALTER TABLE "public"."account_roles" DROP CONSTRAINT "FK_0e94d53a5ed46deaae79475e427"`);
        await queryRunner.query(`ALTER TABLE "public"."role_permissions" DROP CONSTRAINT "FK_0ab5175ebb91e7a07f850acf42e"`);
        await queryRunner.query(`ALTER TABLE "public"."role_permissions" DROP CONSTRAINT "FK_5d5086bd299f773d403574cf1c8"`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" DROP CONSTRAINT "FK_3fc93ffb0cf98dc90788f6de9db"`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" DROP CONSTRAINT "FK_45bab078e7e8bdc778cae913ae8"`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" DROP CONSTRAINT "FK_d7b7486b367205c73b1a1038844"`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" DROP CONSTRAINT "FK_e66f6bd35cd916e2ba6bce84752"`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ALTER COLUMN "booking_type_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ALTER COLUMN "employee_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ALTER COLUMN "address_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ALTER COLUMN "customer_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ADD CONSTRAINT "FK_3fc93ffb0cf98dc90788f6de9db" FOREIGN KEY ("booking_type_id") REFERENCES "booking_type"("booking_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ADD CONSTRAINT "FK_45bab078e7e8bdc778cae913ae8" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ADD CONSTRAINT "FK_d7b7486b367205c73b1a1038844" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."frame_booking" ADD CONSTRAINT "FK_e66f6bd35cd916e2ba6bce84752" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."account_roles" ADD CONSTRAINT "FK_b20890f0e32da210b6beac11abe" FOREIGN KEY ("role") REFERENCES "role"("name") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."account_roles" ADD CONSTRAINT "FK_0e94d53a5ed46deaae79475e427" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "FK_0ab5175ebb91e7a07f850acf42e" FOREIGN KEY ("permission") REFERENCES "permission"("permission") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "FK_5d5086bd299f773d403574cf1c8" FOREIGN KEY ("role") REFERENCES "role"("name") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
