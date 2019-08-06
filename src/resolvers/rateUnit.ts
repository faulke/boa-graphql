import {
  Resolver,
  Query
} from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { RateUnit } from '../entities/rateUnit'

@Resolver(of => RateUnit)
export class RateUnitResolver {
  constructor(
    @InjectRepository(RateUnit) private readonly rateUnitRepository: Repository<RateUnit>
  ) {}

  @Query(returns => [RateUnit], { description: 'Get all trip rate units' })
  async rateUnit(): Promise<RateUnit[]> {
    return this.rateUnitRepository.find()
  }
}
