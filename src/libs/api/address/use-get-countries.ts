import { CountryAPI } from 'src/types/address-api';
import { keys } from 'src/utils/keys';
import { useQuery } from '@tanstack/react-query';

export const useGetCountries = () => {
  const key = keys.countries;

  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const r = await axios.get('address-countries/index?results=300');
      return r?.data?.data as CountryAPI[];
    },
  });
};
