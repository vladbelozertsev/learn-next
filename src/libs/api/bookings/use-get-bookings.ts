import { BookingAPI } from 'src/types/booking-api';
import { getInfiniteQueryPage } from 'src/utils/get-infinite-query-page';
import { useInfiniteQuery } from '@tanstack/react-query';
import { keys } from 'src/utils/keys';

export const useGetBookings = () => {
  const key = keys.bookings;

  return useInfiniteQuery({
    queryKey: key,
    initialPageParam: 1,
    queryFn: getInfiniteQueryPage<BookingAPI>('bookings'),
    getNextPageParam: lastPage => lastPage.nextPage,
    select: data => {
      const items = data?.pages.flatMap(p => p.data);
      return { ...data, items };
    },
  });
};
