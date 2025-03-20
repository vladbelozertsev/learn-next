import { keys } from 'src/utils/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStateUser } from 'src/state/auth';

export type usePostChatMsgTextForm = {
  ChatID: string;
  Message: string;
};

export const usePostChatMsgText = () => {
  const Type = useStateUser()[0]?.ChatTypeMessage.Text_message;
  const queryClient = useQueryClient();
  const getKey = keys.chat;

  return useMutation({
    mutationFn: async (prams: { form: usePostChatMsgTextForm }) => {
      await axios.post('chat-messages', { Type, ...prams.form });
      queryClient.invalidateQueries({ queryKey: getKey(prams.form.ChatID) });
    },
  });
};
