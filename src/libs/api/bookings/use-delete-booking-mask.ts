import { BookingMaskAPI } from 'src/types/booking-mask';
import { keys } from 'src/utils/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteBookingMask = () => {
  const queryClient = useQueryClient();
  const queryKey = keys.bookingsMasks;

  return useMutation({
    mutationFn: async (maskId: BookingMaskAPI['ID']) => {
      await axios.delete(`/bookings-masks/id/${maskId}`);
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
