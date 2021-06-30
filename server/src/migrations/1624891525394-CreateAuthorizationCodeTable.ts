import {
    MigrationInterface,
    QueryRunner,
    Table
} from "typeorm"

export class CreateAuthorizationCodeable1624891525394 implements MigrationInterface {
    name = 'CreateAuthorizationCodeTable1624891525394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "authorization_codes",
            columns: [
              {
                name: "id",
                type: "integer",
                isGenerated: true,
                generationStrategy: "increment",
                isPrimary: true
              },
              {
                name: "code",
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
            ],
            indices: [
              {
                columnNames: ["code"]
              }
            ]
          }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("authorization_codes")
    }

}
