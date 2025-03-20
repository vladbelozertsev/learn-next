import { Asset } from 'react-native-image-picker';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { SupportRequestAPI } from 'src/types/support-request-api';
import { delkeys } from 'src/utils/helpers';
import { getFilesBlob } from 'src/utils/get-files-blob';
import { keys } from 'src/utils/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type AddSupportRequestForm = {
  Reason: string;
  Name: string;
  Message: string;
  files?: (DocumentPickerResponse | Asset)[];
};

export const useAddSupportRequest = () => {
  const queryClient = useQueryClient();
  const key = keys.supportRequests;

  return useMutation({
    mutationFn: async (form: AddSupportRequestForm) => {
      const files = getFilesBlob({ files: form.files, numbered: 'File' });
      const FilesCount = Object.keys(files || {}).length;
      const send = { ...delkeys(form, ['files']), ...files, FilesCount };
      const r = await axios.post('support-requests', send);
      queryClient.invalidateQueries({ queryKey: key });
      return { supportRequestAPI: r.data as SupportRequestAPI };
    },
  });
};
