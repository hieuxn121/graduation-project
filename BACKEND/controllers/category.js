import logger from 'npmlog';
import models from '../models';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { getErrorMsg } from '../utils/common';

const {
  CategoriesCourse
} = models;

export default {

  // Admin create new lession 
  getAllCategory: async (req, res) => {
    try {
      const listCategory = await CategoriesCourse.findAll({
        attributes: ['cate_id', 'cate_name', 'cate_description'],
      });
      return res.status(StatusCodes.OK).send({
        status: StatusCodes.OK,
        success: true,
        message: 'List category successfully found',
        data: listCategory,
      });
    } catch (error) {
      logger.error('category_get', getErrorMsg(error));
      let errStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(errStatusCode).send({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'category found failed',
      });
    }
  },
}