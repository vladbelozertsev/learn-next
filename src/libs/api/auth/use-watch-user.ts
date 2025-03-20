import { UserAPI } from 'src/types/user-api';
import { useIsFocused } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useStateUser } from 'src/state/auth';
import { keys } from 'src/utils/keys';

export const useWatchUser = (refetchInterval?: number) => {
  const isFocused = useIsFocused();
  const setUser = useStateUser()[1];

  return useQuery({
    queryKey: keys.watchUser,
    refetchInterval: refetchInterval || 60000,
    enabled: isFocused,
    queryFn: async () => {
      const user = await axios.get<UserAPI | undefined>('auth/1');
      if (user.data) setUser(user.data);
      return user.data;
    },
  });
};
