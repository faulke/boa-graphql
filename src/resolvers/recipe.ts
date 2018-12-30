import {
  Resolver,
  Query
} from 'type-graphql'

import { Recipe } from '../entities/recipe'

@Resolver(of => Recipe)
export class RecipeResolver {
  private readonly items: Recipe[] = [
    { title: 'Chicken Parm' },
    { title: 'Nachos' }
  ]

  @Query(returns => [Recipe], { description: 'Get all recipes' })
  async recipes(): Promise<Recipe[]> {
    return await this.items
  }
}
