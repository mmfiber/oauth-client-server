import {
  Entity,
  PrimaryColumn,
  Generated,
  Column,
} from "typeorm"

@Entity({name: "clients"})
export class Client {
  @PrimaryColumn({
    type: "varchar",
    length: 128,
    unique: true,
  })
  @Generated("uuid")
  id: string

  @Column({
    type: "text",
    unique: true,
  })
  secret: string
}
