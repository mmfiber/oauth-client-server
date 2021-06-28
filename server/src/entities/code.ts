import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from "typeorm"

@Entity({name: "codes"})
export class Code extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column({
    length: "16",
    unique: true,
    nullable: false
  })
  value: string
}
