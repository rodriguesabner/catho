import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesService } from './candidates.service';
import CandidatesRepository from './candidates.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidates, CandidatesSchema } from './model/candidate.entity';
import { CandidatesController } from './candidates.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

describe('Candidates Test', () => {
  let service: CandidatesService;
  let module: TestingModule;
  let candidatesModel: Model<Candidates>;

  const candidateMock = {
    name: 'Abner Ribeiro Rodrigues',
    skills: ['node', 'react', 'vue', 'php', 'nestjs', 'typescript'],
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI, {
          dbName: 'test-catho',
        }),
        CandidatesRepository,
        MongooseModule.forFeature([
          { name: 'Candidate', schema: CandidatesSchema },
        ]),
      ],
      controllers: [CandidatesController],
      providers: [CandidatesService, CandidatesRepository],
    }).compile();

    service = module.get<CandidatesService>(CandidatesService);
    candidatesModel = module.get('CandidateModel');
  });

  afterAll(async () => {
    await candidatesModel.deleteMany();
    await module.close();
  });

  it('o serviço deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve cadastrar um novo candidato', async () => {
    const result = await service.create(candidateMock);
    expect(result).not.toBeNull();
  });

  it('deve retornar ERRO ao cadastrar um candidato com o mesmo nome', async () => {
    const result = async () => {
      await service.create(candidateMock);
    };

    await expect(result).rejects.toThrow(
      new HttpException(
        `Candidate with name: "${candidateMock.name}" already exists`,
        HttpStatus.CONFLICT,
      ),
    );
  });

  it('deve retornar APENAS UM candidato', async () => {
    const result = await service.findBySkills({ skills: 'node' });
    expect(result.length).toEqual(1);
  });

  it('nao deve retornar nenhum candidato', async () => {
    const result = async () => {
      await service.findBySkills({ skills: 'abner' });
    };

    await expect(result).rejects.toThrow(
      new HttpException('No one candidates found', HttpStatus.NOT_FOUND),
    );
  });
});
