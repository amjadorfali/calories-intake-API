import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class Food {
  @Field({ nullable: false })
  id!: string;

  @Field({ nullable: false })
  name!: string;

  @Field(() => Float, { nullable: false })
  calorieValue!: number;

  @Field({ nullable: false })
  dateTaken!: Date;

  @Field(() => Float, { nullable: true, defaultValue: 0 })
  price?: number;
}
