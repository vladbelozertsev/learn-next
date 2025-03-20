import { useQuery } from '@tanstack/react-query';
import { keys } from 'src/utils/keys';

export const useGetAboutUs = () => {
  const key = keys.aboutUs;

  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const r = await axios.get('content/80');
      return (r.data?.Body || '') as string;
    },
  });
};
