import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Candidates } from './model/candidate.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { SearchSkillCandidateDto } from './dto/search-skill-candidate.dto';
import CandidatesRepository from './candidates.repository';

@Injectable()
export class CandidatesService {
  private candidateRepository: CandidatesRepository<Candidates>;

  constructor(
    @InjectModel('Candidate')
    protected readonly candidateModel: Model<Candidates>,
  ) {
    this.candidateRepository = new CandidatesRepository(candidateModel);
  }

  async create(candidate: CreateCandidateDto) {
    try {
      return await this.candidateRepository.create(candidate);
    } catch (e) {
      throw new HttpException(
        `Candidate with name: "${candidate.name}" already exists`,
        HttpStatus.CONFLICT,
      );
    }
  }

  async findBySkills(candidate: SearchSkillCandidateDto) {
    const skills = this.sanitizeSkills(candidate.skills);

    const matchedCandidate =
      await this.candidateRepository.findBySkills(skills);
    if (matchedCandidate.length <= 0) {
      throw new HttpException('No one candidates found', HttpStatus.NOT_FOUND);
    }

    return matchedCandidate;
  }

  async findAll() {
    const matchedCandidate = await this.candidateRepository.findAll();
    if (matchedCandidate.length <= 0) {
      throw new HttpException('No one candidates found', HttpStatus.NOT_FOUND);
    }

    return matchedCandidate;
  }

  sanitizeSkills(value: string) {
    const skills = value.split(',');
    return skills.map((val) => val.trim().toLocaleLowerCase());
  }
}
