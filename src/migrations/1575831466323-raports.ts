import {MigrationInterface, QueryRunner} from "typeorm";

export class raports1575831466323 implements MigrationInterface {
    name = 'raports1575831466323'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "raports" ("id" SERIAL NOT NULL, "ownerId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "details" json NOT NULL, CONSTRAINT "PK_4ad046102165b915f406ca50a87" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "raports"`, undefined);
    }

}
