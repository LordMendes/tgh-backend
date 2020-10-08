import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCharacterTable1602177910333 implements MigrationInterface {
    name = 'CreateCharacterTable1602177910333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "characters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_9d731e05758f26b9315dac5e378" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_c6e648aeaab79e4213def02aba8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_c6e648aeaab79e4213def02aba8"`);
        await queryRunner.query(`DROP TABLE "characters"`);
    }

}
