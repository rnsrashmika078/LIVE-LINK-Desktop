


import { SaveMessagePayload } from "@/types";
import { deleteMessage, getMessages, saveMessages } from "@/util/actions/message_action";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetMessages(chatId: string) {
  return useQuery({
    queryKey: ["get-messages", chatId],
    queryFn: () => getMessages(chatId),
    enabled: !!chatId,
    refetchOnWindowFocus: false,
  });
}
export function useSaveMessage(onSuccess?: (result: any) => void) {
  return useMutation({
    mutationFn: ({
      content,
      senderId,
      receiverId,
      chatId,
      name,
      dp,
      createdAt,
      customId,
      status,
      files,
      unreads,
    }: SaveMessagePayload) =>
      saveMessages(
        content,
        senderId,
        receiverId,
        chatId,
        name,
        dp,
        createdAt,
        customId,
        status,
        files,
        unreads
      ),
    onSuccess,
  });
}
export function useMessageDelete(onSuccess?: (result: any) => void) {
  return useMutation({
    mutationFn: ({
      messageId,
      public_id,
      chatId,
    }: {
      messageId: string;
      public_id?: string;
      chatId?: string;
    }) => deleteMessage(messageId, public_id ?? "", chatId ?? ""),
    onSuccess,
  });
}
