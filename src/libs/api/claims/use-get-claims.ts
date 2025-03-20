import { ClaimShortAPI } from 'src/types/claim-api';
import { getInfiniteQueryPage } from 'src/utils/get-infinite-query-page';
import { useInfiniteQuery } from '@tanstack/react-query';
import { keys } from 'src/utils/keys';

export const useGetClaims = () => {
  const key = keys.claims;

  return useInfiniteQuery({
    queryKey: key,
    initialPageParam: 1,
    queryFn: getInfiniteQueryPage<ClaimShortAPI>('claims'),
    getNextPageParam: lastPage => lastPage.nextPage,
    select: data => {
      const items = data?.pages.flatMap(p => p.data);
      return { ...data, items };
    },
  });
};
