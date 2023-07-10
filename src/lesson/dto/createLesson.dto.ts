import { IsNotEmpty } from 'class-validator';

export class CreateLesson {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;
}
