import { Asset } from 'react-native-image-picker';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { SupportRequestAPI } from 'src/types/support-request-api';
import { getFilesBlob } from 'src/utils/get-files-blob';
import { keys } from 'src/utils/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type AddSupportRequestMsgForm = {
  ID: SupportRequestAPI['ID'];
  Message: string;
  docs: DocumentPickerResponse[];
  assets: Asset[];
};

export const useAddSupportRequestMsg = () => {
  const queryClient = useQueryClient();
  const getKey = keys.supportRequest;

  return useMutation({
    mutationFn: async (prams: { form: AddSupportRequestMsgForm; controller?: AbortController }) => {
      const { ID, Message } = prams.form;
      const key = getKey(prams.form.ID);
      const input = `support-requests/${prams.form.ID}`;
      const files = getFilesBlob({ ...prams.form, numbered: 'File' });
      const FilesCount = Object.keys(files || {}).length;
      const send = { FilesCount, ID, Message, ...files };
      const signal = { signal: prams.controller?.signal };
      const res = await axios.post<SupportRequestAPI>(input, send, signal);
      queryClient.setQueryData(key, res.data);
    },
  });
};
