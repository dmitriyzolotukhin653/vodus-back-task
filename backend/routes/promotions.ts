import express from 'express';
import { param } from 'express-validator';
import dayjs from 'dayjs';

import { validationMiddleware } from '../middlewares/validationMiddleware';
import PromotionsService from '../services/PromotionsService';

const promotionsRouter = express.Router();

const promotionsService = new PromotionsService();

promotionsRouter.get(
  '/promotions',
  param('search', 'Search query must be a string').optional().isString(),
  param('startDate', 'Start date must be UTC-formatted date string')
    .optional()
    .isDate(),
  param('endDate', 'Start date must be UTC-formatted date string')
    .optional()
    .isDate(),
  validationMiddleware,
  async (req, res) => {
    const { search, startDate, endDate } = req.query as {
      search?: string;
      startDate?: string;
      endDate?: string;
    };

    try {
      const result = await promotionsService.getFilteredPromotions({
        startDate:
          typeof startDate === 'string' ? dayjs.utc(startDate) : startDate,
        endDate: typeof endDate === 'string' ? dayjs.utc(endDate) : endDate,
        search,
      });
      return res.send(JSON.stringify(result));
    } catch (error) {
      console.log('error: ', error);
      return res
        .status(400)
        .send(error instanceof Error ? error.message : 'Something went wrong');
    }
  },
);

export default promotionsRouter;
