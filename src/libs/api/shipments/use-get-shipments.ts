import { ShipmentShortAPI } from 'src/types/shipment-api';
import { getInfiniteQueryPage } from 'src/utils/get-infinite-query-page';
import { useInfiniteQuery } from '@tanstack/react-query';
import { keys } from 'src/utils/keys';

export const useGetShipments = () => {
  const key = keys.shipments;

  return useInfiniteQuery({
    queryKey: key,
    initialPageParam: 1,
    queryFn: getInfiniteQueryPage<ShipmentShortAPI>('shipments'),
    getNextPageParam: lastPage => lastPage.nextPage,
    select: data => {
      const items = data?.pages.flatMap(p => p.data);
      return { ...data, items };
    },
  });
};
