import logger from 'npmlog';
import models from '../models';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { getErrorMsg } from '../utils/common';
import jwt_decode from "jwt-decode"

const {
  sequelize,
  CourseOffering,
  CourseCreator,
  Course,
} = models;

export default {
  // Get all course

  getAllCourses: async (req, res) => {
    let { subject, status, keyword, sort } = req.body;

    try {
      if (subject && subject.length === 0) {
        const [subjects, _1] = await sequelize.query("select cate_name from categories_course");
        subject = subjects.map(s => s.cate_name);
      }

      if (status && status.length === 0) {
        status = ['Getting Started', 'Studying', 'Finished'];
      }
      let queryString = '';
      if (sort === 'nameAZ') {
        queryString = `select * from course as cr inner join categories_course as cc on cr.category_id = cc.cate_id where cc.cate_name in (:subject) AND cr.status in (:status) AND cr.course_name like '%${keyword}%' order by cr.course_name ASC`
      }
      if (sort === 'nameZA') {
        queryString = `select * from course as cr inner join categories_course as cc on cr.category_id = cc.cate_id where cc.cate_name in (:subject) AND cr.status in (:status) AND cr.course_name like '%${keyword}%' order by cr.course_name DESC`
      }
      const [listCourse, _2] = await sequelize.query(queryString,
        {
          replacements: {
            subject,
            status,
            keyword,
          },
        },
      );
      return res.status(StatusCodes.OK).send({
        success: true,
        message: 'Course successfully found',
        course: listCourse,
      });
    } catch (error) {
      logger.error('course_findAll', getErrorMsg(error));
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: getErrorMsg(error),
      });
    }
  },

  getMyCourses: async (req, res) => {
    try {
      let { token } = req.body;
      var decoded = jwt_decode(token);
      const userId = decoded.userId
      console.log('id: ', userId);
      const [listCourse, _3] = await sequelize.query("select * from course where (:userId) =ANY(users_id)",
        {
          replacements: {
            userId
          },
        },
      );
      return res.status(StatusCodes.OK).send({
        success: true,
        message: 'Course successfully found',
        course: listCourse,
      });
    } catch (error) {
      logger.error('course_findAll', getErrorMsg(error));
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: getErrorMsg(error),
      });
    }
  },

  getCourseDetail: async (req, res) => {
    let { id, courseCode } = req.body;
    try {
      let course = [];
      if (courseCode !== null) {
        course = await Course.findOne({
          where: { course_id: id, course_code: courseCode }
        });
      }
      else {
        course = await Course.findOne({
          where: { course_id: id }
        });
      }
      return res.status(StatusCodes.OK).send({
        success: true,
        message: 'Course successfully found',
        course: course,
      });
    } catch (error) {
      logger.error('course_find_detail', getErrorMsg(error));
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: getErrorMsg(error),
      });
    }
  },
  // Admin create new course 

  createNewCourse: async (req, res) => {

    const { course_code, course_name, category, year, term_type, start_date, end_date, user_id_teacher } = req.body;
    console.log('req body: ', req.body);
    const user_id = '2fa3b30d-3225-4918-97f0-ebdc35699bcd';
    const section_id = uuidv4();
    const course_id = uuidv4();
    try {
      const createNewCourse = await CourseOffering.create({
        section_id,
        course_id,
        course_code,
        course_name,
        category,
        year,
        term_type,
        start_date,
        end_date,
        user_id_teacher,
      });

      const newCourseCreator = await CourseCreator.create({
        course_creator_id: uuidv4(),
        user_id,
        section_id
      });

      const newCourse = await Course.create({
        course_id,
        course_code,
        course_name,
        category,
        start_date,
        end_date,
      });

      return res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Course offering successfully created',
      });
    } catch (error) {
      logger.error('course_offering_create', getErrorMsg(error));
      let errStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(errStatusCode).send({
        success: false,
        message: 'Create course offering failed',
      });
    }
  },

  deleteCourse: async (req, res) => {

    const { id } = req.params;
    try {
      const createNewCourse = await Course.update(
        { is_active },
        {
          where: {
            id,
          },
          returning: true,
          plain: true,
          underscored: true,
        },
      );

      return res.status(StatusCodes.OK).send({
        success: true,
        message: 'Delete course successfully',
      });
    } catch (error) {
      logger.error('course_offering_delete', getErrorMsg(error));
      let errStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(errStatusCode).send({
        success: false,
        message: 'Delete course successfully',
      });
    }
  }
};
