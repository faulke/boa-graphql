import { Field, ObjectType, ID } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
@ObjectType({ description: 'Object representing trip rate unit types' })
export class RateUnit {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(type => String)
  @Column()
  name: string
}