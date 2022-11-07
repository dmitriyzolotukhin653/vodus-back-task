import fs from 'fs';
import dayjs, { Dayjs } from 'dayjs';

import { Promotion } from '../entities/Promotion';
import Filters from '../utils/classes/Filters';
import { checkIsInRange } from '../utils/checkInRange';

class PromotionsService {
  async getFilteredPromotions({
    search,
    startDate,
    endDate,
  }: {
    search?: string;
    startDate?: Dayjs;
    endDate?: Dayjs;
  }) {
    const json = await fs.promises.readFile('./data/vodus-test.json', {
      encoding: 'utf-8',
    });
    const promotions = JSON.parse(json) as Array<Partial<Promotion>>;
    const filters = new Filters<Partial<Promotion>>();
    if (search)
      filters.addFilter(
        (promo) =>
          checkIsInRange(promo.promo_title, search) ||
          checkIsInRange(promo.promo_description, search) ||
          checkIsInRange(promo.terms_and_conditions, search),
      );
    if (startDate) {
      filters.addFilter((promo) => {
        if (!promo.start_date) return false;
        const dayjsObj =
          typeof promo.start_date === 'string'
            ? dayjs.utc(promo.start_date.trim(), 'YYYY-MM-DD')
            : dayjs.utc(1000 * 1000 * promo.start_date);
        return dayjsObj.isAfter(startDate);
      });
    }
    if (endDate) {
      filters.addFilter((promo) => {
        if (!promo.end_date) return false;
        const dayjsObj =
          typeof promo.end_date === 'string'
            ? dayjs.utc(promo.end_date.trim(), 'YYYY-MM-DD')
            : dayjs.utc(1000 * 1000 * promo.end_date);
        return dayjsObj.isBefore(endDate);
      });
    }

    return filters.applyFilters(promotions);
  }
}

export default PromotionsService;
