import {
  Resolver,
  Query
} from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Recipe } from '../entities/recipe'

@Resolver(of => Recipe)
export class RecipeResolver {
  constructor(
    @InjectRepository(Recipe) private readonly recipeRepository: Repository<Recipe>
  ) {}

  @Query(returns => [Recipe], { description: 'Get all recipes' })
  async recipes(): Promise<Recipe[]> {
    return this.recipeRepository.find()
  }
}
