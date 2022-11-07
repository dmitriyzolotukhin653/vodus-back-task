import { AxiosResponse } from 'axios';

import { instance } from './instance';
import { Promotion } from './types';

class PromotionsAPI {
  static getPromotions = (params: {
    search?: string;
    startDate?: string;
    endDate?: string;
  } = {}): Promise<AxiosResponse<Array<Partial<Promotion>>>> => {
    return instance.get(`/promotions`, { params });
  };
}

export default PromotionsAPI;
