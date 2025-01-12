/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public } from 'src/auth/decorators/public.decorator';
import { extname } from 'path';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enums';
import { IsApprovedOrIsAdmin } from './guards/approval.guard';

const storage = diskStorage({
  destination: './uploads/images',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
})

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  @Roles(Role.Admin)
  @UseInterceptors(
    FileFieldsInterceptor([
      {name: "image", maxCount: 1},
      {name: "book", maxCount: 1}
    ], {
      storage: storage
    })
  )
  async create(@Body() createProductDto: CreateProductDto, @UploadedFiles() files: {
    image?: Express.Multer.File[];
    book?: Express.Multer.File[];
  }) {
    const creatData = {
      name: createProductDto.name,
      description: createProductDto.description, 
      category: createProductDto.category,
      bookName: createProductDto.bookName,
      image: files.image[0].filename,
      book: files.book[0].filename,
    }
    return this.productService.create(creatData);
  }

  @Get()
  @UseGuards(IsApprovedOrIsAdmin)
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(IsApprovedOrIsAdmin)
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get('/category/:category')
  @Public()
  async findByCategory(@Param('category') category: string) {
    return this.productService.findByCategory(category);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseInterceptors(
    FileFieldsInterceptor([
      {name: "image", maxCount: 1},
      {name: "book", maxCount: 1}
    ], {
      storage: storage
    })
  )
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: {
      image?: Express.Multer.File[];
      book?: Express.Multer.File[];
    }
  ) {
    const constractedData = {}
    if(updateProductDto.name) {
      constractedData["name"] = updateProductDto.name
    }
    if(updateProductDto.category) {
      constractedData["category"] = updateProductDto.category
    }
    if(updateProductDto.description) {
      constractedData["description"] = updateProductDto.description
    }
    if(updateProductDto.bookName) {
      constractedData["bookName"] = updateProductDto.bookName
    }
    if(files.image) {
      constractedData["image"] = files.image[0]?.filename
    }
    if(files.book) {
      constractedData["book"] = files.book[0]?.filename
    }
    return this.productService.update(id, constractedData);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}