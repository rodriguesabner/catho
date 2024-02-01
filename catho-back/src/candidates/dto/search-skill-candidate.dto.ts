import { IsNotEmpty, IsString } from 'class-validator';

export class SearchSkillCandidateDto {
  @IsString()
  @IsNotEmpty()
  skills: string;
}
