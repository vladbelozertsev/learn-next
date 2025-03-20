import { ContentAPI } from 'src/types/content-api';
import { getInfiniteQueryPage } from 'src/utils/get-infinite-query-page';
import { keys } from 'src/utils/keys';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetBlogs = () => {
  const key = keys.blogs;

  return useInfiniteQuery({
    queryKey: key,
    initialPageParam: 1,
    queryFn: async ctx => {
      const input = (qs: string) => `content${qs}&CategoryID=1`;
      return getInfiniteQueryPage<ContentAPI>(input)(ctx);
    },
    getNextPageParam: lastPage => lastPage.nextPage,
    select: data => {
      const pages = data?.pages.flatMap(p => p.data);
      return { ...data, pages };
    },
  });
};
