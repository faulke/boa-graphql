import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Guide } from './guide'

@Entity()
@ObjectType({ description: 'Object representing a guided trip' })
export class Trip {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(type => Guide)
  @ManyToOne(type => Guide, guide => guide.user, { lazy: true })
  guide: Promise<Guide>
}
