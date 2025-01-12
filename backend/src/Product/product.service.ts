/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import * as fs from "fs";
import * as path from 'path';

interface CreateData {
  name: string,
  description: string | null | undefined, 
  category: string,
  bookName: string,
  image: string,
  book: string,
}

interface UpdateData {
  name?: string,
  description?: string | null | undefined, 
  category?: string,
  bookName?: string,
  image?: string,
  book?: string,
}

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create( createDate: CreateData): Promise<Product> {
    const product = this.productModel.create(createDate)
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ category }).exec();
  }

  async update(id: string, data: UpdateData): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    if(deletedProduct.book) {
      const filePath = path.join(__dirname, 'uploads/images', deletedProduct.book);
      fs.unlink(filePath, (err) => {
        console.log(err)
      })
    }
    if(deletedProduct.image) {
      const filePath = path.join(__dirname, 'uploads/images', deletedProduct.image);
      fs.unlink(filePath, (err) => {
        console.log(err)
      })
    }
    return deletedProduct;
  }
}
