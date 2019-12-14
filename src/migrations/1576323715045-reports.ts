import {MigrationInterface, QueryRunner} from "typeorm";

export class reports1576323715045 implements MigrationInterface {
    name = 'reports1576323715045'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "details"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reports" ADD "details" json NOT NULL`, undefined);
    }

}
