import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { CreateLesson } from './dto/createLesson.dto';
import { v4 } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    try {
      return this.lessonRepository.findOne({ where: { id } });
    } catch (err) {
      console.log('err', err);
    }
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate } = createLessonInput;

    const lesson = this.lessonRepository.create({
      id: v4(),
      name,
      startDate,
      endDate,
    });

    return await this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(
    assignStudentsToLesson: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    try {
      const { lessonId, studentIds } = assignStudentsToLesson;
      console.log('ssss', assignStudentsToLesson);
      const lesson = await this.lessonRepository.findOne({
        where: { id: lessonId },
      });

      console.log('lesson', lesson);

      if (lesson.students)
        lesson.students = [...lesson.students, ...studentIds];
      else lesson.students = studentIds;

      return await this.lessonRepository.save(lesson);
    } catch (err) {
      console.log('err', err);
    }
  }
}
