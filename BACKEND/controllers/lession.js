import logger from 'npmlog';
import models from '../models';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import {getErrorMsg} from '../utils/common';

const { 
  Lession,
  LessionVideo,
  LessionPdf
}  = models;

export default {
  
  // Admin create new lession 
  getAllLession: async (req, res) => {
    const course_id = req.params.id;
    try {
      
      await Lession.findAll({
        attributes: ['lession_id' , 'course_id', 'lession_name', 'lession_description', 'lession_time'],
        where: { courseId: course_id },
      });

      return res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Lession successfully found',
        data: createNewLession,
      });
    } catch (error) {
      logger.error('lession_create', getErrorMsg(error));
      let errStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(errStatusCode).send({
        success: false,
        message: 'Lession found failed',
      });
    }
  },

  createNewLession: async (req, res) => {
    const course_id = req.params.id;
    const {lession_name, lession_description, lesssion_time, video_id, pdf_file_id } = req.body;
    const lession_id = uuidv4();
    try {
        const createNewLession = await LessionOffering.create({
          lession_id,
          course_id,
          lession_name,
          lession_description,
          lesssion_time,
          video_id,
          pdf_file_id
        });
        return res.status(StatusCodes.CREATED).send({
          success: true,
          message: 'Create lession successfully created',
          data: createNewLession,
        });
      } catch (error) {
        logger.error('lession_create', getErrorMsg(error));
        let errStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(errStatusCode).send({
          success: false,
          message: 'Create lession offering failed',
      });
    };
  },

  getAllVideo: async (req, res) => {
    const course_id = req.params.id;
    const lession_id = req.params.lessionId;
    try {
      
      await LessionVideo.findAll({
        attributes: ['video_id' , 'lession_id', 'video_file'],
        where: { courseId: course_id, lessionId: lession_id},
      });

      return res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Lession video successfully found',
        data: createNewLession,
      });
    } catch (error) {
      logger.error('lession_video_get', getErrorMsg(error));
      let errStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(errStatusCode).send({
        success: false,
        message: 'Lession video found failed',
      });
    }
  },

  createNewVideo: async (req,res) => {
    const lession_id = req.params.lessionId;
    const { video_file } = req.body;
    const video_id = uuidv4();
    try {
        const createNewLession = await LessionOffering.create({
          video_id,
          lession_id,
          video_file
        });
        return res.status(StatusCodes.CREATED).send({
          success: true,
          message: 'Create lession video successfully created',
          data: createNewLession,
        });
      } catch (error) {
        logger.error('lession__video_create', getErrorMsg(error));
        let errStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(errStatusCode).send({
          success: false,
          message: 'Create lession video offering failed',
      });
    };
  },

  deleteVideo: async (req,res) => {
    const { videoId } = req.params;
    let t = null;
    try {
      t = await sequelize.transaction();
      const deleteVideoResult = await LessionVideo.destroy({ where: { videoId } });
      return res.status(StatusCodes.OK).send({
        success: true,
        message: 'Video successfully delete',
        data: deleteVideoResult,
      });
    } catch (error) {
      logger.error('lession_video_delete', getErrorMsg(err));
      await t.rollback();
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: err,
      });
    }
  },

  getAllPdfFile: async (req,res,) => {
    const course_id = req.params.id;
    const lession_id = req.params.lessionId;
    try {
      
      await LessionVideo.findAll({
        attributes: ['pdf_file_id' , 'lession_id', 'pdf_file'],
        where: { courseId: course_id, lessionId: lession_id},
      });

      return res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Lession pdf file successfully found',
        data: createNewLession,
      });
    } catch (error) {
      logger.error('lession_pdf_file_find', getErrorMsg(error));
      let errStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(errStatusCode).send({
        success: false,
        message: 'Lession pdf file found failed',
      });
    }
  },

  createNewPdfFile: async (req,res) => {
    const lession_id = req.params.lessionId;
    const { pdf_file } = req.body;
    const pdf_file_id = uuidv4();
    try {
        const createNewLession = await LessionOffering.create({
          pdf_file_id,
          lession_id,
          pdf_file
        });
        return res.status(StatusCodes.CREATED).send({
          success: true,
          message: 'Create lession pdf file successfully created',
          data: createNewLession,
        });
      } catch (error) {
        logger.error('lession_pdf_filecreate', getErrorMsg(error));
        let errStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(errStatusCode).send({
          success: false,
          message: 'Create lession pdf file offering failed',
      });
    };
  },

  deletePdfFile: async (req, res) => {
    const { pdfFileId } = req.params;
    let t = null;
    try {
      t = await sequelize.transaction();
      const deleteVideoResult = await LessionPdf.destroy({ where: { pdfFileId } });
      return res.status(StatusCodes.OK).send({
        success: true,
        message: 'Pdf file successfully delete',
        data: deleteVideoResult,
      });
    } catch (error) {
      logger.error('lession_pdf_file_delete', getErrorMsg(err));
      await t.rollback();
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: err,
      });
    }
  }
}