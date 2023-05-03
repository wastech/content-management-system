import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { mongooseConfig } from './database/mongoose.config';
import { AnyExceptionFilter } from './http-exception.filter';
import { APP_FILTER } from '@nestjs/core';

import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [mongooseConfig(), AuthModule, UserModule, BlogModule],
  controllers: [AppController],
  providers: [
    AppService,AuthModule,UserModule,
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
  ],
})
export class AppModule {}
