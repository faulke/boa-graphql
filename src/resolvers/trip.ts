import {
  Resolver,
  Query,
  Arg,
  ID
} from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Trip } from '../entities/trip'

@Resolver(of => Trip)
export class TripResolver {
  constructor(
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>
  ) {}

  @Query(returns => [Trip], { nullable: true, description: 'Get all trips.' })
  async trips(): Promise<Trip[]> {
    return this.tripRepository.find()
  }
}
