import { MongooseModule } from '@nestjs/mongoose';

export function mongooseConfig() {
  const mongodbUri = process.env.MONGODB_URI;
  return MongooseModule.forRoot(mongodbUri);
}
