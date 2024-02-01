import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { CandidatesSchema } from './model/candidate.entity';
import { MongooseModule } from '@nestjs/mongoose';
import CandidatesRepository from './candidates.repository';

@Module({
  imports: [
    CandidatesRepository,
    MongooseModule.forFeature([
      { name: 'Candidate', schema: CandidatesSchema },
    ]),
  ],
  controllers: [CandidatesController],
  providers: [CandidatesService, CandidatesRepository],
})
export class CandidatesModule {}
