import { UserAPI } from 'src/types/user-api';
import { useMutation } from '@tanstack/react-query';
import { useStateUser } from 'src/state/auth';

export const useGetUser = () => {
  const setUser = useStateUser()[1];

  return useMutation({
    mutationFn: async () => {
      const user = await axios.get<UserAPI | undefined>('auth/1');
      if (user.data) setUser(user.data);
      return user.data;
    },
  });
};
