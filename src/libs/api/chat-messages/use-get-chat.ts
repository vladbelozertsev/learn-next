import { ChatMessageAPI as M } from 'src/types/chat-message-api';
import { useIsFocused } from '@react-navigation/native';
import { keys } from 'src/utils/keys';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export type ChatIdParams = {
  Assign?: string;
  AssignID?: string;
};

export const useGetChat = (params: ChatIdParams) => {
  const { Assign: a, AssignID: aId } = params;
  const chatIdKey = keys.chatId(a, aId);
  const getChatKey = keys.chat;
  const isFocused = useIsFocused();
  const queryClient = useQueryClient();

  const id = useQuery({
    enabled: !!a && !!aId,
    queryKey: chatIdKey,
    queryFn: async () => {
      const r = await axios.get<{ 'chat-id': string }>('chats/get', { params });
      return { ChatID: r.data['chat-id'] };
    },
  });

  const msgs = useQuery({
    refetchInterval: 15000,
    enabled: !!id.data?.ChatID && isFocused,
    queryKey: getChatKey(id.data?.ChatID),
    queryFn: async () => {
      const key = getChatKey(id.data?.ChatID);
      const prev = queryClient.getQueryData<{ ['last-update']: string; data: M[] }>(key);
      const data = { params: { LastUpdate: prev?.['last-update'], ChatID: id.data?.ChatID } };
      const r = await axios.get<{ ['last-update']: string; data: M[] }>('chat-messages', data);
      const unique = r.data.data.filter(m => !prev?.data.find(({ ID }) => ID === m.ID));
      return { ...r.data, data: [...unique.reverse(), ...(prev?.data || [])] };
    },
  });

  return { id, msgs };
};

/**
 * Useful links:
 * https://github.com/TanStack/query/discussions/1828
 **/
