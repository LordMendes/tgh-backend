import {MigrationInterface, QueryRunner} from "typeorm";

export class FixUserPasswordAtribute1602182193217 implements MigrationInterface {
    name = 'FixUserPasswordAtribute1602182193217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
