import { keys } from 'src/utils/keys';
import { useQuery } from '@tanstack/react-query';
import { ShipmentDeliveryAPI, ShipmentDeliveryLocation } from 'src/types/shipment-api';

export const useGetDeliveriesLocations = (deliveryID: ShipmentDeliveryAPI['ID'], enabled: boolean) => {
  const key = keys.deliveryLocations(deliveryID);

  return useQuery({
    queryKey: key,
    enabled: enabled,
    queryFn: async () => {
      const r = await axios.get(`deliveries-locations?DeliveryID=${deliveryID}`);
      const locations = (r?.data?.data || []) as ShipmentDeliveryLocation[];
      return locations.map(l => ({ latitude: +l.Lat, longitude: +l.Lng, title: l.Date }));
    },
  });
};
