import { ContentAPI } from 'src/types/content-api';
import { keys } from 'src/utils/keys';
import { useIsFocused } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

export const useGetBlog = (id: string) => {
  const key = keys.blog(id);
  const isFocused = useIsFocused();

  return useQuery({
    enabled: isFocused,
    refetchInterval: 15000,
    queryKey: key,
    queryFn: async ctx => {
      const input = `content/${ctx.queryKey[1]}`;
      const response = await axios.get(input);
      return response.data as ContentAPI;
    },
  });
};
