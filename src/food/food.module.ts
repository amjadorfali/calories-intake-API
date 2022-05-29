import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodResolver } from './food.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './food.schema';

@Module({
  providers: [FoodResolver, FoodService],
  imports: [MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }])],
  exports: [FoodService],
})
export class FoodModule {}
