import { useMutation, useQueryClient } from '@tanstack/react-query';
import { keys } from 'src/utils/keys';
import { BookingMaskAPI } from 'src/types/booking-mask';

export type AddBookingMaskForm = {
  CityFrom: string;
  CityTo: string;
  DayOfWeek: string;
  params: {
    Code: string;
    CodeID: string;
    Boxes: number;
    FullBoxes?: number;
    Thermorecorder: number;
  }[];
};

export const useAddBookingMask = () => {
  const queryClient = useQueryClient();
  const queryKey = keys.bookingsMasks;

  return useMutation({
    mutationFn: async (form: AddBookingMaskForm) => {
      await axios.post<BookingMaskAPI>('bookings-masks', form);
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
