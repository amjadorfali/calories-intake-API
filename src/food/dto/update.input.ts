import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class UpdateFoodInput {
  @Field({ nullable: false })
  foodId!: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  calorieValue?: number;

  @Field({ nullable: true })
  dateTaken?: Date;

  @Field(() => Float, { nullable: true, defaultValue: 0 })
  price?: number;
}
