import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTransactions1587321789086
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'value');
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'value',
        type: 'decimal',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'value');

    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'value',
        type: 'decimal',
      }),
    );
  }
}
