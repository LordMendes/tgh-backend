import {MigrationInterface, QueryRunner} from "typeorm";

export class AddWorldFieldToGuild1604368467910 implements MigrationInterface {
    name = 'AddWorldFieldToGuild1604368467910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guilds" ADD "world" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guilds" DROP COLUMN "world"`);
    }

}
