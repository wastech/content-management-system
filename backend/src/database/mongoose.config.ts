import { MongooseModule } from '@nestjs/mongoose';

export function mongooseConfig() {
  return MongooseModule.forRoot('mongodb://127.0.0.1:27017/CMS');
}
