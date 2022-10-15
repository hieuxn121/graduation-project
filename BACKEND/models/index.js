import Sequelize from 'sequelize';
import sequelize from './sequelizeInstance';
import CategoriesCourse from './category/categories-course';
import CourseCreator from './course/course-creator.js';
import CourseOffering from './course/course-offering';
import Course from './course/course';
import Lesson from './lesson/lesson';
import LessonVideo from './lesson/lesson-video';
import LessonPdf from './lesson/lesson-pdf';
import Assignment from './lesson/assignment';
import AssignmentSubmission from './lesson/assignment_submission';
import Enroll from './student/enroll';
import StudentCourseDetail from './student/student_course_detail';
import Grade from './course/grade'

export default {
  sequelize,
  Sequelize,
  CategoriesCourse,
  CourseCreator,
  CourseOffering,
  Course,
  Lesson,
  LessonVideo,
  LessonPdf,
  Assignment,
  AssignmentSubmission,
  Enroll,
  StudentCourseDetail,
  Grade
}
