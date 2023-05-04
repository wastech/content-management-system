import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogSchema } from './entities/blog.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
