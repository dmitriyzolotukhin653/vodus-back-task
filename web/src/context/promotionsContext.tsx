import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from 'react';

import { Promotion } from '../api/types';
import PromotionsAPI from '../api/promotions';

type PromotionsContextProps = {
  promotions: Array<Partial<Promotion>>;
  loading: boolean;
  error: string | null;
  getPromotions: (params?: PromotionsSearchParams) => void;
};

export type PromotionsSearchParams = Parameters<
  typeof PromotionsAPI.getPromotions
>[0];

export const PromotionsContext = createContext<PromotionsContextProps>({
  promotions: [],
  loading: true,
  error: null,
  getPromotions: () => {},
});

export const PromotionsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [promotions, setPromotions] = useState<Array<Partial<Promotion>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getPromotions = useCallback(
    async (params: PromotionsSearchParams = {}) => {
      setLoading(true);
      try {
        const response = await PromotionsAPI.getPromotions(params);
        setPromotions(response.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Something went wrong',
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <PromotionsContext.Provider
      value={{ promotions, loading, error, getPromotions }}
    >
      {children}
    </PromotionsContext.Provider>
  );
};
