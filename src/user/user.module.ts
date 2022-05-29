import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FoodModule } from 'src/food/food.module';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UserResolver, UserService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), FoodModule, forwardRef(() => AuthModule)],

  exports: [UserService],
})
export class UserModule {}
