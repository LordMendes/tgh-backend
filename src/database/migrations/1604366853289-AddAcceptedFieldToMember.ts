import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddAcceptedFieldToMember1604366853289
  implements MigrationInterface {
  name = 'AddAcceptedFieldToMember1604366853289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "members" ADD "accepted" boolean NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "privilege"`);
    await queryRunner.query(
      `ALTER TABLE "members" ADD "privilege" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "privilege"`);
    await queryRunner.query(
      `ALTER TABLE "members" ADD "privilege" boolean NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "accepted"`);
  }
}
