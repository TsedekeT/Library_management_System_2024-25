/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ProductCategory } from './enum/ProductCategory';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(ProductCategory)
  category: ProductCategory;
  
  @IsNotEmpty()
  @IsString()
  bookName: string;
 
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  book: string;

  @IsOptional()
  @IsString()
  image: string;
}
