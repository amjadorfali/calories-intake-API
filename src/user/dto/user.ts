import { Field, InputType } from '@nestjs/graphql';

@InputType('UserInputType')
export class UserType {
  @Field({ nullable: false })
  userName!: string;

  @Field({ nullable: false })
  role!: 'admin' | 'customer';

  @Field({ nullable: false })
  password!: string;

  @Field({ nullable: true })
  dailyLimit?: number;
}
