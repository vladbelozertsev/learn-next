import { LoadOfferAPI } from 'src/types/load-offer-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { keys } from 'src/utils/keys';

export type AcceptOfferPrams = {
  form: AcceptOfferForm;
  onSuccess?: (data: LoadOfferAPI) => any;
};

export type AcceptOfferForm = {
  ID: LoadOfferAPI['ID'];
  DealType: LoadOfferAPI['ID'];
  CargoCost: LoadOfferAPI['ID'];
};

export const useAcceptOffer = () => {
  const getKeyLoadOffers = keys.loadOffers;
  const keyShipments = keys.shipments;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (prams: AcceptOfferPrams) => {
      const r = await axios.post<LoadOfferAPI>('loads-offers', prams.form);
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
      await queryClient.invalidateQueries({ queryKey: keyShipments });
    },
  });
};
