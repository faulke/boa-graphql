import {
  Resolver,
  Query,
  Arg,
  ID
} from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Guide } from '../entities/guide'

@Resolver(of => Guide)
export class GuideResolver {
  constructor(
    @InjectRepository(Guide) private readonly guideRepository: Repository<Guide>
  ) {}

  @Query(returns => Guide, { nullable: true, description: 'Get single guide by id.' })
  async guide(@Arg('guideId', type => ID) guideId: string): Promise<Guide> {
    return this.guideRepository.findOne(guideId)
  }

  @Query(returns => [Guide], { description: 'Get all guides.' })
  async guides(): Promise<Guide[]> {
    return this.guideRepository.find()
  }
}
