import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { SearchSkillCandidateDto } from './dto/search-skill-candidate.dto';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidatesService.create(createCandidateDto);
  }

  @Get('search')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findBySkills(@Query() query: SearchSkillCandidateDto) {
    return this.candidatesService.findBySkills(query);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll() {
    return this.candidatesService.findAll();
  }
}
