import { Module } from '@nestjs/common';
import { CandidatesModule } from './candidates/candidates.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: 'catho',
    }),
    CandidatesModule,
  ],
  providers: [],
})
export class AppModule {}
