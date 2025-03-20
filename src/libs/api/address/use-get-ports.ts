import { CountryAPI, PortAPI } from 'src/types/address-api';
import { keys } from 'src/utils/keys';
import { useQuery } from '@tanstack/react-query';

export const useGetPorts = (country?: CountryAPI['ID']) => {
  const key = keys.ports(country);

  return useQuery({
    queryKey: key,
    enabled: !!country,
    queryFn: async () => {
      const r = await axios.get(`ports?results=100000&CountryCode=${country}`);
      return r?.data?.data as PortAPI[];
    },
  });
};
