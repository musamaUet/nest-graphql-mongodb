import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository, In } from 'typeorm';
import { StudentInput } from './student.input';
import { v4 } from 'uuid';

export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async createStudent(createStudent: StudentInput): Promise<Student> {
    const { firstName, lastName } = createStudent;
    const student = this.studentRepository.create({
      id: v4(),
      firstName,
      lastName,
    });
    return await this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    console.log('getMana', studentIds);
    try {
      return await this.studentRepository.find({
        where: {
          id: In(studentIds),
        },
      });
    } catch (err) {
      console.log('sdsd', err);
    }
  }
}
