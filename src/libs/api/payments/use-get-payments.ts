import { PaymentAPI } from 'src/types/payment-api';
import { getInfiniteQueryPage } from 'src/utils/get-infinite-query-page';
import { keys } from 'src/utils/keys';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useIsFocused } from '@react-navigation/native';

export const useGetPayments = () => {
  const isFocused = useIsFocused();
  const key = keys.payments;

  return useInfiniteQuery({
    queryKey: key,
    initialPageParam: 1,
    enabled: isFocused,
    refetchInterval: 60000,
    queryFn: getInfiniteQueryPage<PaymentAPI>('payments'),
    getNextPageParam: lastPage => lastPage.nextPage,
    select: data => {
      const items = data?.pages.flatMap(p => p.data);
      return { ...data, items };
    },
  });
};
