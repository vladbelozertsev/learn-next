import { Asset } from 'react-native-image-picker';
import { ChatMessageAPI as M } from 'src/types/chat-message-api';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { UserAPI } from 'src/types/user-api';
import { getFilesBlob } from 'src/utils/get-files-blob';
import { keys } from 'src/utils/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type usePostChatMsgTextForm = {
  ChatID: string;
  Message: string;
  docs: DocumentPickerResponse[];
  assets: Asset[];
};

type R = {
  data: M;
  url: string;
  object: 'message';
};

export const usePostChatMsg = () => {
  const getKey = keys.chat;
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (prams: { form: usePostChatMsgTextForm }) => {
      const { docs, assets, ChatID, Message } = prams.form;
      const msgs = qc.getQueryData<{ data: M[] }>(getKey(prams.form.ChatID));
      const files = getFilesBlob({ docs, assets, numbered: 'File' });
      const FilesCount = Object.keys(files || {}).length;
      const send = (data: any, Type: valueof<UserAPI['ChatTypeMessage']>) => ({ ChatID, Type, ...data });
      const r1 = !!FilesCount && (await axios.post<R>('chat-messages', send({ FilesCount, ...files }, '1')));
      const r2 = !!Message && (await axios.post<R>('chat-messages', send({ Message }, '2')));
      const data = r1 && r2 ? [r2.data.data, r1.data.data] : r1 ? [r1.data.data] : r2 ? [r2.data.data] : [];
      const filtered = data.filter(m => !msgs?.data.find(({ ID }) => ID === m.ID));
      qc.setQueryData(getKey(prams.form.ChatID), { ...msgs, data: [...filtered, ...(msgs?.data || [])] });
    },
  });
};
