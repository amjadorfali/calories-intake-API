import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserCalories {
  @Field({ description: 'Calorie Daily Limit', nullable: true, defaultValue: 2100 })
  dailyLimit?: number;
}
