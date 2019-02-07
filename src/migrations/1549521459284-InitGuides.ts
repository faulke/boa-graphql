import {MigrationInterface, QueryRunner} from "typeorm";

export class InitGuides1549521459284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "trip" ("id" SERIAL NOT NULL, "guideId" integer, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guide" ("id" SERIAL NOT NULL, "photo" character varying, "userId" integer, CONSTRAINT "REL_2fd0995d8daf878c3ce955593c" UNIQUE ("userId"), CONSTRAINT "PK_fe92b4af32150e0580d37eacaef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_88a009e66aeeba3c1f73d0df605" FOREIGN KEY ("guideId") REFERENCES "guide"("id")`);
        await queryRunner.query(`ALTER TABLE "guide" ADD CONSTRAINT "FK_2fd0995d8daf878c3ce955593c2" FOREIGN KEY ("userId") REFERENCES "user"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "guide" DROP CONSTRAINT "FK_2fd0995d8daf878c3ce955593c2"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_88a009e66aeeba3c1f73d0df605"`);
        await queryRunner.query(`DROP TABLE "guide"`);
        await queryRunner.query(`DROP TABLE "trip"`);
    }

}
