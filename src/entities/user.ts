import { Field, ObjectType, ID } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
@ObjectType({ description: 'Object representing a user '})
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column()
  username: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  email: string
}
