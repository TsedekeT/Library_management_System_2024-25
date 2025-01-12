/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; // <-- Add this import

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  bookName: string;

  @Prop({
    default: null
  })
  image: string;

  @Prop()
  category: string;

  @Prop({
    default: null
  })
  book: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);


