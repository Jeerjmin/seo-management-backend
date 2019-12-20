import {MigrationInterface, QueryRunner} from "typeorm";

export class users1576859267264 implements MigrationInterface {
    name = 'users1576859267264'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD "appsList" text array NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "appsList"`, undefined);
    }

}
