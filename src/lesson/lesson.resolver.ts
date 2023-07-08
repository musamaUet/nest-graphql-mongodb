import { Resolver, Query } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: '1234',
      name: 'Test Name',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
