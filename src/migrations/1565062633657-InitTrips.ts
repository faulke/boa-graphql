import {MigrationInterface, QueryRunner} from "typeorm";

export class InitTrips1565062633657 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "rate_unit" ("id" SERIAL NOT NULL, CONSTRAINT "PK_839dafbdef812e7af816083d202" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trip" ADD "duration" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trip" ADD "maxGuests" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trip" ADD "rate" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "rate"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "maxGuests"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "duration"`);
        await queryRunner.query(`DROP TABLE "rate_unit"`);
    }

}
