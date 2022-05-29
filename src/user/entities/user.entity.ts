import { ObjectType, Field } from '@nestjs/graphql';
import { Food } from 'src/food/entities/food.entity';
@ObjectType()
export class UserEntity {
  @Field({ nullable: false })
  id!: string;

  @Field({ nullable: false })
  userName!: string;

  @Field({ nullable: false })
  role!: 'admin' | 'customer';

  @Field({ nullable: true })
  dailyLimit?: number;

  @Field({ nullable: false })
  password!: string;

  @Field({ nullable: false })
  registrationNumber!: number;

  @Field(() => [Food], { nullable: true, name: 'foods' })
  foods?: Food[];
}
