import { Field, ObjectType, ID } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
@ObjectType({ description: 'Object representing cooking recipe' })
export class Recipe {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  title: string
}
