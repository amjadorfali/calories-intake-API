import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateFoodInput, UpdateFoodInput } from './dto';
import { Food } from './entities/food.entity';
import { FoodDocument } from './food.schema';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  async create(createFoodInput: CreateFoodInput, userId: string): Promise<FoodDocument> {
    return await new this.foodModel({
      ...createFoodInput,
      user: userId,
    }).save();
  }

  async findAll(id: string): Promise<FoodDocument[]> {
    return await this.foodModel.find({ user: id }).sort('-created_at').exec();
  }

  async findOne(id: string): Promise<FoodDocument | null> {
    return await this.foodModel.findById(id).exec();
  }

  async updateByField(toUpdate: UpdateFoodInput): Promise<FoodDocument | null> {
    const { foodId, ...newValues } = toUpdate;
    const aliases = this.translateAliases({
      ...newValues,
    });
    return await this.foodModel.findByIdAndUpdate(foodId, aliases, { new: true });
  }

  async remove(id: string): Promise<FoodDocument | null> {
    return await this.foodModel.findByIdAndDelete(id).exec();
  }

  async deleteAll(): Promise<string> {
    await this.foodModel.deleteMany().exec();
    return '';
  }

  translateAliases(input: Partial<UpdateFoodInput>): FoodDocument {
    return this.foodModel.translateAliases(input);
  }
}
