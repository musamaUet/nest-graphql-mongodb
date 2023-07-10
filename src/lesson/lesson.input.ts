import { Field, ID, InputType } from '@nestjs/graphql';
import { MinLength, IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

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

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}
