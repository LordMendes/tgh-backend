import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeMembershipFromCharacterToUSer1604371209785 implements MigrationInterface {
    name = 'ChangeMembershipFromCharacterToUSer1604371209785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_82a12bddb6625e91d6e443069eb"`);
        await queryRunner.query(`ALTER TABLE "members" RENAME COLUMN "character_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "members" RENAME CONSTRAINT "REL_82a12bddb6625e91d6e443069e" TO "UQ_da404b5fd9c390e25338996e2d1"`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_da404b5fd9c390e25338996e2d1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_da404b5fd9c390e25338996e2d1"`);
        await queryRunner.query(`ALTER TABLE "members" RENAME CONSTRAINT "UQ_da404b5fd9c390e25338996e2d1" TO "REL_82a12bddb6625e91d6e443069e"`);
        await queryRunner.query(`ALTER TABLE "members" RENAME COLUMN "user_id" TO "character_id"`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_82a12bddb6625e91d6e443069eb" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
