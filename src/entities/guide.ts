import { Field, ObjectType, ID } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { User } from './user'
import { Trip } from './trip'

@Entity()
@ObjectType({ description: 'Object representing a guide ' })
export class Guide {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(type => User)
  @OneToOne(type => User)
  @JoinColumn()
  readonly user: User

  @Field()
  @Column({ nullable: true })
  photo: string

  @Field(type => [Trip])
  @OneToMany(type => Trip, trip => trip.guide, { eager: true })
  trips: Trip[]
}
