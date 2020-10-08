import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateTables1602176963470 implements MigrationInterface {
  name = 'CreateTables1602176963470';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "job" character varying NOT NULL, "privilege" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "guild_id" uuid, CONSTRAINT "REL_da404b5fd9c390e25338996e2d" UNIQUE ("user_id"), CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "guilds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "whatsapp" character varying NOT NULL, "discord" character varying NOT NULL, "teamspeak" character varying NOT NULL, "owner_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e7e7f2a51bd6d96a9ac2aa560f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "members" ADD CONSTRAINT "FK_da404b5fd9c390e25338996e2d1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "members" ADD CONSTRAINT "FK_16aceddd5b89825b8ed6029ad1c" FOREIGN KEY ("guild_id") REFERENCES "guilds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "members" DROP CONSTRAINT "FK_16aceddd5b89825b8ed6029ad1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "members" DROP CONSTRAINT "FK_da404b5fd9c390e25338996e2d1"`,
    );
    await queryRunner.query(`DROP TABLE "guilds"`);
    await queryRunner.query(`DROP TABLE "members"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
