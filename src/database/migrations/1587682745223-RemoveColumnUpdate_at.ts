import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RemoveColumnUpdateAt1587682745223
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" RENAME COLUMN "update_at" TO "updated_at"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" RENAME COLUMN "updated_at" TO "update_at"`,
    );
  }
}
