import { keys } from 'src/utils/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type AddBookingForm = {
  CityFrom: string;
  CityTo: string;
  DepartureDate: string;
  params: {
    Code: string;
    CodeID: string;
    Boxes: number;
    FullBoxes?: number;
    Thermorecorder: number;
  }[];
};

export const useAddBooking = () => {
  const queryClient = useQueryClient();
  const queryKey = keys.bookings;

  return useMutation({
    mutationFn: async (form: AddBookingForm) => {
      const { CityFrom, CityTo, DepartureDate } = form;
      const extra = { CityFrom, CityTo, DepartureDate };
      const params = form.params.map(i => ({ ...i, ...extra }));
      await axios.post('bookings', { params });
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
