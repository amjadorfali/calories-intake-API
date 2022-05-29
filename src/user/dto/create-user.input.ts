import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'User Name', nullable: false })
  userName!: string;
  @Field({ description: 'Role', nullable: false })
  role!: 'admin' | 'customer';
  @Field({ description: 'Pass', nullable: false })
  password!: string;
  @Field({ description: 'Calorie Daily Limit', nullable: true, defaultValue: 2100 })
  dailyLimit?: number;
}
