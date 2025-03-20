import { Asset } from 'react-native-image-picker';
import { ClaimAPI } from 'src/types/claim-api';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { getFilesBlob } from 'src/utils/get-files-blob';
import { keys } from 'src/utils/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type AddSupportRequestMsgForm = {
  Claim_ID: ClaimAPI['ID'];
  Message: string;
  docs: DocumentPickerResponse[];
  assets: Asset[];
};

export const useAddClaimMsg = () => {
  const queryClient = useQueryClient();
  const getKey = keys.supportRequest;

  return useMutation({
    mutationFn: async (prams: { form: AddSupportRequestMsgForm; controller?: AbortController }) => {
      const { Claim_ID, Message } = prams.form;
      const key = getKey(prams.form.Claim_ID);
      const files = getFilesBlob({ ...prams.form, numbered: 'File' });
      const FilesCount = Object.keys(files || {}).length;
      const send = { FilesCount, Claim_ID, Message, ...files };
      const signal = { signal: prams.controller?.signal };
      const res = await axios.post<ClaimAPI>('claims-messages', send, signal);
      queryClient.setQueryData(key, res.data);
    },
  });
};
