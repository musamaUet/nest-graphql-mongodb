import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsDateString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @MinLength(1)
  @Field()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  @Field()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  @Field()
  endDate: string;
}
