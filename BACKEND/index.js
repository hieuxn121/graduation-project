import express from 'express';
import logger from 'npmlog';
import cors from 'cors';
import models from './models';
import { registerCourseRoutes } from './routes/v1/course';
import { registerTeacherRoutes } from './routes/v1/teacher';
import { registerUserRoutes } from './routes/v1/user';
import { registerAuthRoutes } from './routes/v1/auth';
import { registerCategoryRoutes } from './routes/v1/category';
import { convertUTCDateToLocalDate } from './utils/common';
const {
  sequelize,
} = models;

require('dotenv').config();

var CronJob = require('cron').CronJob;
var job = new CronJob(
  '0 */1 * * * *',
  async () => {
    const [time, _2] = await sequelize.query(
      "select course_id, start_date, end_date, status from course",
    );
    time.map( async (e) => {
      const start = convertUTCDateToLocalDate(e.start_date);
      const end = convertUTCDateToLocalDate(e.end_date);
      const now = convertUTCDateToLocalDate(new Date())
      const beforeStatus = e.status
      let status = '';
      if ((start > now && end > now) == true) {
        status = 'Getting Started'
      }
      if ((start < now && end > now) == true) {
        status = 'Studying'
      }
      if ((start < now && end < now) == true) {
        status = 'Finished'
      }

      if (status !== beforeStatus) {
        try {
          await sequelize.query(
            "UPDATE course SET status = (:status) WHERE course_id = (:courseId) ",
            {
              replacements: {
                courseId: e.course_id,
                status
              },
            },
          );
        } catch (error) {
          console.log(error);
        }
      }
    })
  },
  null,
  true,
);
job.start();

const app = express();
const forceHttps = (req, res, next) => {
  if (!process.env.PORT) {
    next();
  }

  if (
    req.headers['x-forwarded-proto'] &&
    req.headers['x-forwarded-proto'] === 'http'
  ) {
    res.redirect(`https://${req.headers.host + req.originalUrl}`);
  } else {
    next();
  }
};

// Error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (!err.statusCode) err = Boom.boomify(err);

  if (req.xhr) {
    return err.isBoom
      ? res.status(err.output.statusCode).json(err.output.payload)
      : res.status(err.statusCode).json(err);
  }
  return err.isBoom
    ? res.status(err.output.statusCode).send(err.output.payload.message)
    : res.status(err.statusCode).send(err.message);
};
app.set('port', process.env.PORT || 3002);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.all('*', forceHttps);
app.use(cors())
app.use(errorHandler);

registerAuthRoutes(app);
registerCourseRoutes(app);
registerTeacherRoutes(app);
registerCategoryRoutes(app);
registerUserRoutes(app);

/** redirect to root */
app.use('/*', (req, res) => {
  res.redirect('/');
});
app.listen(app.get('port'), () => {
  logger.info(`Application is running at ${process.env.BASE_URL}`)
})