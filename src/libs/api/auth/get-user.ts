import { UserAPI } from 'src/types/user-api';

export const getUser = async () => {
  try {
    const r = await axios.get<UserAPI | undefined>('auth/1');
    return { data: r.data, error: null };
  } catch (error: any) {
    console.error(error);
    return { data: undefined, error };
  }
};
