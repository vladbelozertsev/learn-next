import { AirportAPI, CountryAPI } from 'src/types/address-api';
import { keys } from 'src/utils/keys';
import { useQuery } from '@tanstack/react-query';

export const useGetAirports = (country?: CountryAPI['ID']) => {
  const key = keys.cities(country);

  return useQuery({
    queryKey: key,
    enabled: !!country,
    queryFn: async () => {
      const r = await axios.get(`address-airports?results=100000&CountryCode=${country}`);
      return r?.data?.data as AirportAPI[];
    },
  });
};
