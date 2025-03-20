import { ExchangeRatesAPI } from 'src/types/exchange-rates-api';
import { keys } from 'src/utils/keys';
import { useQuery } from '@tanstack/react-query';

export const useGeExchange = () => {
  const key = keys.exchange;

  return useQuery({
    refetchInterval: 300000,
    queryKey: key,
    queryFn: async () => {
      const r = await axios.get('exchange-rates/1');
      return r.data as ExchangeRatesAPI;
    },
  });
};
