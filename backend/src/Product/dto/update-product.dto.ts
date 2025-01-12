/* eslint-disable prettier/prettier */
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ProductCategory } from './enum/ProductCategory';



export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  bookName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  book?: number;
}
