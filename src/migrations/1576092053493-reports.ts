import {MigrationInterface, QueryRunner} from "typeorm";

export class reports1576092053493 implements MigrationInterface {
    name = 'reports1576092053493'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "issues" ADD "seoScore" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "issues" ADD "seoIssues" integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "issues" DROP COLUMN "seoIssues"`, undefined);
        await queryRunner.query(`ALTER TABLE "issues" DROP COLUMN "seoScore"`, undefined);
    }

}
