import { LoadOfferAPI } from 'src/types/load-offer-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { keys } from 'src/utils/keys';

export type RejectOfferPrams = {
  params: RejectOfferParams;
  onSuccess?: (data: LoadOfferAPI) => any;
};

export type RejectOfferParams = {
  ID: LoadOfferAPI['ID'];
};

export const useRejectOffer = () => {
  const getKeyLoadOffers = keys.loadOffers;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (prams: RejectOfferPrams) => {
      const r = await axios.put<LoadOfferAPI>('loads-offers', undefined, prams);
      if (prams.onSuccess) await prams.onSuccess(r.data);
      return r.data;
    },
    onSuccess: async data => {
      const keyLoadOffersActive = getKeyLoadOffers(data.Load_ID, '1');
      const keyLoadOffersAccept = getKeyLoadOffers(data.Load_ID, '5');
      const keyLoadOffersReject = getKeyLoadOffers(data.Load_ID, '99');
      await queryClient.invalidateQueries({ queryKey: keyLoadOffersActive });
      await queryClient.invalidateQueries({ queryKey: keyLoadOffersAccept });
      await queryClient.invalidateQueries({ queryKey: keyLoadOffersReject });
    },
  });
};
