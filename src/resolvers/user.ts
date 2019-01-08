import {
  Resolver,
  Query,
  Arg,
  ID
} from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { User } from '../entities/user'

@Resolver(of => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query(returns => [User], { description: 'Get all users.' })
  async users(): Promise<User[]> {
    return this.userRepository.find()
  }

  @Query(returns => User, { nullable: true, description: 'Get single user by id.'})
  async user(@Arg('userId', type => ID) userId: string): Promise<User> {
    return this.userRepository.findOne(userId)
  }
}