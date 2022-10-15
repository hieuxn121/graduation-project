import logger from 'npmlog';
import models from '../models';
import { StatusCodes } from 'http-status-codes';
import { getErrorMsg } from '../utils/common';
import jwt_decode from "jwt-decode"

const {
  sequelize
} = models;

export default {

  getUserInfo: async (req, res) => {
    try {
      var decoded = jwt_decode(req.body.token);
      console.log('token: ', decoded);
      const [userInfo, _1] = await sequelize.query(
        "select * from users where user_Id = (:ID)",{
          replacements: {
            ID: decoded.userId
          }
        }
      );
      if (userInfo && userInfo.length) {
        const user = userInfo[0];
        return res.status(StatusCodes.OK).send({
          status: StatusCodes.OK,
          success: true,
          message: 'User Info successfully found',
          user: {
            id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            address: user.address
          }
        });
      }
    } catch (error) {
      logger.error('get_user_info', getErrorMsg(error));
      let errStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(errStatusCode).send({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'User found failed',
      });
    }
  },

  updateUserInfo: async (req, res) => {
    const user = req.body;
    console.log('user id: ', user.user_id);
    try {
      const [userInfo, _2] = await sequelize.query(
        "update users set first_name = (:first_name), last_name = (:last_name), email = (:email), phone_number = (:phone_number) where user_id = (:userId)",{
          replacements: {
            userId: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
          }
        }
      );
      if (userInfo && userInfo.length) {
        return res.status(StatusCodes.OK).send({
          status: StatusCodes.OK,
          success: true,
          message: 'User Info successfully update',
          user: userInfo[0]
        });
      }
    } catch (error) {
      logger.error('update_user_info', getErrorMsg(error));
      let errStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(errStatusCode).send({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'User update failed',
      });
    }
  },
}