import { ContentAPI } from 'src/types/content-api';
import { keys } from 'src/utils/keys';
import { useQuery } from '@tanstack/react-query';

export const useGetDocuments = () => {
  const queryKey = keys.content;

  return useQuery({
    queryKey,
    queryFn: async () => {
      const docs = [4, 98]; // [4, 7, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
      const qs = docs.reduce((acc, id) => `${acc}&IDs[]=${id}`, '').substring(1);
      const r = await axios.get(`content?${qs}`);
      return r.data?.data as ContentAPI[];
    },
  });
};
