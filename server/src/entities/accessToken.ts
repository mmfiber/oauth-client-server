import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from "typeorm"

@Entity({name: "access_tokens"})
export class AccessToken extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column({
    length: "32",
    unique: true,
    nullable: false
  })
  token: string

  @Column({
    name: "expires_at",
    nullable: false
  })
  expiresAt: Date
}
