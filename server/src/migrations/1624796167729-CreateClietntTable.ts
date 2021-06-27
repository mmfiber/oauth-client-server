import {
    MigrationInterface,
    QueryRunner,
    Table,
} from "typeorm"

export class CreateClietntTable1624796167729 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "clients",
      columns: [
        {
          name: "id",
          type: "varchar(128)",
          isPrimary: true,
          isUnique: true
        },
        {
          name: "secret",
          type: "text",
          isNullable: false
        },
        {
          name: "created_at",
          type: "datetime",
          isNullable: false,
          default: "CURRENT_TIMESTAMP"
        },
        {
          name: "updated_at",
          type: "datetime",
          isNullable: false,
          default: "CURRENT_TIMESTAMP",
          onUpdate: "CURRENT_TIMESTAMP"
        },
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clients")
  }

}
