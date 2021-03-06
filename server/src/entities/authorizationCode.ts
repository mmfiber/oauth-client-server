import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from "typeorm"

@Entity({name: "authorization_codes"})
export class AuthorizationCode extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column({
    length: "16",
    unique: true,
    nullable: false
  })
  code: string
}
