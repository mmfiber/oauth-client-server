import {
    MigrationInterface,
    QueryRunner,
    Table
} from "typeorm"

export class CreateCodeTable1624891525394 implements MigrationInterface {
    name = 'CreateCodeTable1624891525394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "codes",
            columns: [
              {
                name: "id",
                type: "integer",
                isGenerated: true,
                generationStrategy: "increment",
                isPrimary: true
              },
              {
                name: "value",
                type: "varchar(16)",
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
        await queryRunner.dropTable("codes")
    }

}
