import { Asset } from 'react-native-image-picker';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { getFilesBlob } from 'src/utils/get-files-blob';
import { keys } from 'src/utils/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStateUser } from 'src/state/auth';

export type AddChatPostMsgForm = {
  ChatID: string;
  docs: DocumentPickerResponse[];
  assets: Asset[];
};

export const usePostChatMsgFiles = () => {
  const Type = useStateUser()[0]?.ChatTypeMessage.Attached_file;
  const queryClient = useQueryClient();
  const getKey = keys.chat;

  return useMutation({
    mutationFn: async (prams: { form: AddChatPostMsgForm }) => {
      const extra = { ChatID: prams.form.ChatID, Type };
      const files = getFilesBlob({ ...prams.form, numbered: 'File' });
      const FilesCount = Object.keys(files || {}).length;
      await axios.post('chat-messages', { FilesCount, ...files, ...extra });
      queryClient.invalidateQueries({ queryKey: getKey(prams.form.ChatID) });
    },
  });
};
