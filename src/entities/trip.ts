import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { ObjectType, Field, ID, Int } from 'type-graphql'
import { Guide } from './guide'
import { RateUnit } from './rateUnit'

@Entity()
@ObjectType({ description: 'Object representing a guided trip' })
export class Trip {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(type => Guide)
  @ManyToOne(type => Guide, guide => guide.user, { lazy: true })
  guide: Promise<Guide>

  @Field(type => Int)
  @Column()
  duration: number

  @Column()
  @Field(type => Int)
  maxGuests: number

  @Column()
  @Field(type => Int)
  rate: number

  @Field(type => RateUnit)
  @JoinColumn()
  rateUnit: RateUnit
}
