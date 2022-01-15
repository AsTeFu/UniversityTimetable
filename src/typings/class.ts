import {Classroom, Group, Teacher, Type} from '.';

export type Class = {
  type: Type;
  name: string;
  classId: string;
  groups: Group[];
  dates: string[];
  teacher: Teacher;
  classroom: Classroom;
};
