import {MigrationInterface, QueryRunner} from "typeorm";

export class users1576323800032 implements MigrationInterface {
    name = 'users1576323800032'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "details"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reports" ADD "details" json NOT NULL`, undefined);
    }

}
