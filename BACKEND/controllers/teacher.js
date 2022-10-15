import logger from 'npmlog';
import models from '../models';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import {getErrorMsg} from '../utils/common';

const { 
  sequelize
}  = models;

export default {
  
  // Admin create new lession 
  getAllTeacher: async (req, res) => {
    try {
      const [listTeacher, _1] = await sequelize.query(
        "select * from users where user_type = 'T'"
      );
      return res.status(StatusCodes.CREATED).send({
        status: StatusCodes.CREATED,
        success: true,
        message: 'List teacher successfully found',
        data: listTeacher,
      });
    } catch (error) {
      logger.error('teacher_get', getErrorMsg(error));
      let errStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(errStatusCode).send({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Teacher found failed',
      });
    }
  },
}