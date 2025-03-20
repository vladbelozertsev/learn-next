import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { UserAPI } from 'src/types/user-api';
import { setToken } from 'src/utils/keychain-token';
import { useMutation } from '@tanstack/react-query';
import { useStateUser } from 'src/state/auth';

export type Form = {
  Password: string;
  Email: string;
};

export const useLogin = () => {
  const setUser = useStateUser()[1];

  return useMutation({
    mutationFn: async (form: Form) => {
      const android = Platform.OS === 'android' && (1 as const);
      const ios = Platform.OS === 'ios' && (2 as const);
      const UUID = await messaging().getToken();
      const data = { ...form, UUID, Type: android || ios || Platform.OS };
      const user = await axios.post<UserAPI | undefined>('auth', data).then(r => r.data);
      if (user) await setToken(user.APIKey);
      if (user) setUser(user);
    },
  });
};
