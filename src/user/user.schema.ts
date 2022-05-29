import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    alias: 'registrationNumber',
  })
  registration_number!: number;
  @Prop({
    minlength: 3,
    maxlength: 20,
    unique: true,
    alias: 'userName',
    required: true,
  })
  user_name!: string;

  @Prop({ required: true })
  role!: 'admin' | 'customer';

  @Prop({ required: false, alias: 'dailyLimit' })
  daily_limit?: number;

  @Prop({
    required: true,
    minlength: 8,
  })
  password!: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
