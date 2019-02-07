import {
  Resolver,
  Query,
  Arg,
  ID,
  Ctx
} from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { User } from '../entities/user'
import { Context } from './types/context'

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

  @Query(returns => User, { nullable: true, description: 'Get current user.' })
  async me(@Ctx() ctx: Context): Promise<User> {
    const { userId } = ctx

    if (!userId) {
      return null
    }

    return this.userRepository.findOne(ctx.userId)
  }
}
