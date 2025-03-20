import { Asset } from 'react-native-image-picker';
import { ClaimAPI } from 'src/types/claim-api';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { delkeys } from 'src/utils/helpers';
import { getFilesBlob } from 'src/utils/get-files-blob';
import { keys } from 'src/utils/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type AddClaimForm = {
  ID: ClaimAPI['ID'];
  Reason: string;
  Message: string;
  RefundAmount: number;
  files: { docs?: DocumentPickerResponse[]; assets?: Asset[] };
};

export const useAddClaim = () => {
  const queryClient = useQueryClient();
  const keyShipments = keys.shipments;
  const keyClaims = keys.claims;

  return useMutation({
    mutationFn: async (form: AddClaimForm) => {
      const files = { ...form.files, numbered: 'MainFiles' };
      const send = delkeys({ ...form, ...getFilesBlob(files) }, ['files']);
      const r = await axios.post('claims', send);
      queryClient.invalidateQueries({ queryKey: keyShipments });
      queryClient.invalidateQueries({ queryKey: keyClaims });
      return r.data as ClaimAPI;
    },
  });
};
