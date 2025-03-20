import { ShipmentAPI } from 'src/types/shipment-api';
import { keys } from 'src/utils/keys';
import { useQuery } from '@tanstack/react-query';
import { useIsFocused } from '@react-navigation/native';

export const useGetShipment = (id: string) => {
  const key = keys.shipment(id);
  const isFocused = useIsFocused();

  return useQuery({
    queryKey: key,
    enabled: isFocused,
    refetchInterval: 60000,
    queryFn: async ctx => {
      const input = `shipments/${ctx.queryKey[1]}`;
      const response = await axios.get(input);
      return response.data as ShipmentAPI;
    },
  });
};
