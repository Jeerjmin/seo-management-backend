import {MigrationInterface, QueryRunner} from "typeorm";

export class users1575823459112 implements MigrationInterface {
    name = 'users1575823459112'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD "onboardingCompleted" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "onboardingCompleted"`, undefined);
    }

}
