import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RemoveColumnUpdateAtInCategory1587683122967
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" RENAME COLUMN "update_at" TO "updated_at"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" RENAME COLUMN "updated_at" TO "update_at"`,
    );
  }
}
