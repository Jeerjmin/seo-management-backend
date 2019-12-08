import {MigrationInterface, QueryRunner} from "typeorm";

export class reports1575831858193 implements MigrationInterface {
    name = 'reports1575831858193'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "reports" ("id" SERIAL NOT NULL, "ownerId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "details" json NOT NULL, CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "reports"`, undefined);
    }

}
