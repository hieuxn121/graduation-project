
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
import logger from 'npmlog';
import models from '../models';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { getErrorMsg } from '../utils/common';
import { convertUTCDateToLocalDate } from '../utils/common';

const {
  sequelize,
  Lesson,
} = models;

const CLIENT_ID = '507137610706-153t81svk56souoojrljcvpjo3a9bo0l.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//044ftbs5l6R8xCgYIARAAGAQSNwF-L9IrMN5VmsIzSBiDFUywNq3APdOYiGOhyIzDXLpQw8ieUYWmS15uGiTIUy9Sa1jSxdKGE1Q';


const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})

export const Lessons = {
  getListLessons: async ( req, res ) => {
    const {courseId} = req.params;
    try {
        let lessons = await Lesson.findAll({
          where: { course_id: courseId }
        });
      return res.status(StatusCodes.OK).send({
        success: true,
        message: 'Lesson successfully found',
        lessons: lessons,
      });
    } catch (error) {
      logger.error('lesson_find_detail', getErrorMsg(error));
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: getErrorMsg(error),
      });
    }
  },

  setFilePublic: async (fileId) => {
    try {
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      })

      const getUrl = await drive.files.get({
        fileId,
        fields: 'webViewLink, webContentLink'
      })

      return getUrl;
    } catch (error) {
      console.error(error);
    }
  },

  getFile: async({ shared }) => {
    console.log('TADA');
  },

  /**
 * Create a folder and prints the folder ID
 * @return{obj} folder Id
 * */
  createFolder :  async () => {
    const fileMetadata = {
      'name': 'Physic',
      'parents' : ['1ewSkUOLFQdQN6tOPDYbUYnyBctwjlbjE'],
      'mimeType': 'application/vnd.google-apps.folder',
    };
    try {
      const file = await drive.files.create({
        resource: fileMetadata,
        fields: 'id',
      });
      console.log('Folder Id:', file.data.id);
      return file.data.id;
    } catch (err) {
      // TODO(developer) - Handle error
      throw err;
    }
  },

  uploadFile: async ({ shared }) => {
    try {
      const createFile = await drive.files.create({
        requestBody: {
          name: "lession1.jpg",
          mimeType: 'application/pdf'
        },
        media: {
          mimeType: 'application/pdf',
          body: fs.createReadStream(path.join(__dirname, '/../lession1.pdf'))
        }
      })
      const fileId = createFile.data.id;
      const getUrl = await Lessons.setFilePublic(fileId);
      const link = `https://drive.google.com/open?id=${fileId}`;
      const lessonId = 'ccbe31f2-28db-4e5a-b207-633571756f8f';
      const courseId = 'c69e65eb-b953-4b71-802c-5d03b9edac64'

      const result = await Lesson.update({ pdf_file_link: link }, {
        where: {lesson_id: lessonId, course_id: courseId}
      })
      if (result === 1) {
        return res.status(StatusCodes.OK).send({
          success: true,
          message: 'Lesson successfully update link',
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
  deleteFile: async (fileId) => {
    try {
      const deleteFile = await drive.files.delete({
        fileId: fileId
      })
      console.log(deleteFile.data, deleteFile.status)
    } catch (error) {
      console.error(error);
    }
  }
}