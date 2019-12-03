import {MigrationInterface, QueryRunner} from "typeorm";

export class users1575386068169 implements MigrationInterface {
    name = 'users1575386068169'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "ownerName" character varying NOT NULL, "shopName" character varying NOT NULL, "originalDomain" character varying NOT NULL, "domain" character varying NOT NULL, "email" character varying NOT NULL, "accessToken" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
