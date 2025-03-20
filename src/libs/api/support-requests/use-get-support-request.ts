import { SupportRequestAPI } from 'src/types/support-request-api';
import { useIsFocused } from '@react-navigation/native';
import { keys } from 'src/utils/keys';
import { useQuery } from '@tanstack/react-query';

export const useGetSupportRequest = (id: string) => {
  const key = keys.supportRequest(id);
  const isFocused = useIsFocused();

  return useQuery({
    enabled: isFocused,
    refetchInterval: 15000,
    queryKey: key,
    queryFn: async ctx => {
      const input = `support-requests/${ctx.queryKey[1]}`;
      const response = await axios.get(input);
      return response.data as SupportRequestAPI;
    },
  });
};
