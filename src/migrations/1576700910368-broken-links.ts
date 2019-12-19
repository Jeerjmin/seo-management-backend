import {MigrationInterface, QueryRunner} from "typeorm";

export class brokenLinks1576700910368 implements MigrationInterface {
    name = 'brokenLinks1576700910368'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "broken-links" ("id" SERIAL NOT NULL, "ownerId" integer NOT NULL, "overallLinksCount" integer NOT NULL, "pagesCount" integer NOT NULL, "brokenLinks" text array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ae1005f00ac1c28bb5d9ec24e45" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "broken-links"`, undefined);
    }

}
