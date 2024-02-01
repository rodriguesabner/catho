import { Model } from 'mongoose';
import { Candidates } from './model/candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';

class CandidatesRepository<T> {
  constructor(private model: Model<T>) {}

  async create(candidate: CreateCandidateDto) {
    try {
      const newCandidate = new this.model(candidate);
      await newCandidate.save();

      return newCandidate;
    } catch (e) {
      throw e;
    }
  }

  async findAll() {
    return this.model.find().limit(10);
  }

  async findBySkills(skills: string[]): Promise<Candidates[]> {
    return this.model.aggregate([
      {
        $match: {
          skills: { $in: skills },
        },
      },
      {
        $project: {
          id: 1,
          name: 1,
          avatar: 1,
          email: 1,
          skills: 1,
          skillsMatched: {
            $size: {
              $setIntersection: ['$skills', skills],
            },
          },
          totalSkills: { $size: '$skills' },
        },
      },
      {
        $addFields: {
          matchPercentage: {
            $round: [
              {
                $multiply: [
                  {
                    $divide: ['$skillsMatched', skills.length],
                  },
                  100,
                ],
              },
              2,
            ],
          },
        },
      },
      {
        $sort: { skillsMatched: -1 },
      },
      {
        $limit: 1,
      },
    ]);
  }
}

export default CandidatesRepository;
