import {
    MigrationInterface,
    QueryRunner,
    Table
} from "typeorm"

export class CreateAccessTokenTable1625054857085 implements MigrationInterface {
    name = 'CreateAccessTokenTable1625054857085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "access_tokens",
            columns: [
              {
                name: "id",
                type: "integer",
                isGenerated: true,
                generationStrategy: "increment",
                isPrimary: true
              },
              {
                name: "token",
                type: "varchar(32)",
                isNullable: false,
                isUnique: true
              },
              {
                name: "expires_at",
                type: "datetime",
                isNullable: false,
                default: "CURRENT_TIMESTAMP"
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
        await queryRunner.dropTable("access_tokens")
    }

}
