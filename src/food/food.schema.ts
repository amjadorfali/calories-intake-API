import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserDocument } from 'src/user/user.schema';
import { Float } from '@nestjs/graphql';
@Schema()
export class Food {
  @Prop({ required: true })
  name!: string;
  @Prop({ required: true, alias: 'calorieValue' })
  calorie_value!: number;

  @Prop({ required: true, alias: 'dateTaken' })
  date_taken!: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user!: UserDocument;

  @Prop({ required: false, default: 0 })
  price?: number;
}

export type FoodDocument = Food & Document;
export const FoodSchema = SchemaFactory.createForClass(Food);
