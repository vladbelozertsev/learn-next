import { getInfiniteQueryPage } from 'src/utils/get-infinite-query-page';
import { useInfiniteQuery } from '@tanstack/react-query';
import { keys } from 'src/utils/keys';
import { BookingMaskAPI } from 'src/types/booking-mask';

export const useGetBookingsMasks = () => {
  const key = keys.bookingsMasks;

  return useInfiniteQuery({
    queryKey: key,
    initialPageParam: 1,
    queryFn: getInfiniteQueryPage<BookingMaskAPI>('bookings-masks'),
    getNextPageParam: lastPage => lastPage.nextPage,
    select: data => {
      const items = data?.pages.flatMap(p => p.data);
      return { ...data, items };
    },
  });
};
