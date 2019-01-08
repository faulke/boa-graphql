import {
  Resolver,
  Query
} from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { User } from '../entities/user'

@Resolver(of => User)
export class RecipeResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query(returns => [User], { description: 'Get all users.' })
  async users(): Promise<User[]> {
    return this.userRepository.find()
  }
}