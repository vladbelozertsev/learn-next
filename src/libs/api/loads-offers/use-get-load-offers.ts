import { LoadAPI } from 'src/types/load-api';
import { getInfiniteQueryPage } from 'src/utils/get-infinite-query-page';
import { useInfiniteQuery } from '@tanstack/react-query';
import { keys } from 'src/utils/keys';

export const useGetLoadOffers = (loadId: LoadAPI['ID'], status?: number[]) => {
  const key = keys.loadOffers(loadId, status?.toString());
  const statuses = status?.reduce((acc, cur) => `${acc}&Statuses[]=${cur}`, '');
  const params = `&Load_ID=${loadId}${statuses}`;

  return useInfiniteQuery({
    queryKey: key,
    initialPageParam: 1,
    queryFn: getInfiniteQueryPage<LoadAPI>(qp => `loads-offers/index${qp}${params}`),
    getNextPageParam: lastPage => lastPage.nextPage,
    select: data => {
      const items = data?.pages.flatMap(p => p.data);
      return { ...data, items };
    },
  });
};
