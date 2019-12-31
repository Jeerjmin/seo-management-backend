import {MigrationInterface, QueryRunner} from "typeorm";

export class brokenLinks1577754705329 implements MigrationInterface {
    name = 'brokenLinks1577754705329'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "broken-links" ADD "origin" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "broken-links" DROP COLUMN "origin"`, undefined);
    }

}
