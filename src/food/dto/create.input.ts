import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateFoodInput {
  @Field({ nullable: false })
  name!: string;

  @Field(() => Float, { nullable: false })
  calorieValue!: number;

  @Field(() => Float, { nullable: true, defaultValue: 0 })
  price?: number;

  @Field({ nullable: false })
  dateTaken!: Date;
}
