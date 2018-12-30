import { getRepository } from 'typeorm'

import { Recipe } from '../entities/recipe'

export async function seedDatabase(): Promise<void> {
  const recipeRepository = getRepository(Recipe)

  const recipes = recipeRepository.create([
    { title: 'Chicken Parm' },
    { title: 'Nachos' }
  ])

  await recipeRepository.save(recipes)
}
