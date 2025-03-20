import { LoadAPI } from 'src/types/load-api';
import { getInfiniteQueryPage } from 'src/utils/get-infinite-query-page';
import { useInfiniteQuery } from '@tanstack/react-query';
import { keys } from 'src/utils/keys';
import { useIsFocused } from '@react-navigation/native';

export const useGetLoads = (status?: string) => {
  const isFocused = useIsFocused();
  const key = keys.loads(status);

  return useInfiniteQuery({
    queryKey: key,
    initialPageParam: 1,
    refetchInterval: 60000,
    enabled: isFocused,
    queryFn: getInfiniteQueryPage<LoadAPI>(qp => `loads${qp}&Status=${status}`),
    getNextPageParam: lastPage => lastPage.nextPage,
    select: data => {
      const items = data?.pages.flatMap(p => p.data);
      return { ...data, items };
    },
  });
};
