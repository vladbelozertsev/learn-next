import { ClaimAPI } from 'src/types/claim-api';
import { useIsFocused } from '@react-navigation/native';
import { keys } from 'src/utils/keys';
import { useQuery } from '@tanstack/react-query';

export const useGetClaim = (id: string) => {
  const key = keys.claim(id);
  const isFocused = useIsFocused();

  return useQuery({
    enabled: isFocused,
    refetchInterval: 15000,
    queryKey: key,
    queryFn: async ctx => {
      const input = `claims/${ctx.queryKey[1]}`;
      const response = await axios.get(input);
      return response.data as ClaimAPI;
    },
  });
};
