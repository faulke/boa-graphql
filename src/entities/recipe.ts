import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Object representing cooking recipe' })
export class Recipe {
  @Field()
  title: string
}
