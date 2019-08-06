import {MigrationInterface, QueryRunner} from "typeorm";

export class TripRateUnit1565063002850 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rate_unit" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rate_unit" DROP COLUMN "name"`);
    }

}
