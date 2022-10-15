import logger from 'npmlog';
import models from '../models';
import { StatusCodes } from 'http-status-codes';
import { getErrorMsg } from '../utils/common';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const {
  sequelize
} = models;

export default {

  // Admin create new lession 
  login: async (req, res) => {
    const { email, password } = req.body;
    let loadUser;
    try {
      const [listUser, _1] = await sequelize.query(
        "select * from users where email = (:email) AND password = (:password)",
        {
          replacements: {
            email,
            password
          },
        },
      );
      if (listUser && listUser.length != 0) {
        loadUser = listUser[0];
        const token = jwt.sign({
          email: loadUser.email,
          userId: loadUser.user_id.toString()
        },
          "somesupersecretkey",
          { expiresIn: '1h' }
        );
        return res.status(StatusCodes.CREATED).send({
          status: StatusCodes.OK,
          success: true,
          message: 'Login Successfully',
          token,
          user: loadUser
        });
      }
      else {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          status: StatusCodes.UNAUTHORIZED,
          success: true,
          message: 'Login Failed',
        });
      }
    } catch (error) {
      logger.error('login', getErrorMsg(error));
      let errStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(errStatusCode).send({
        success: false,
        message: 'Login failed',
      });
    }
  },
}