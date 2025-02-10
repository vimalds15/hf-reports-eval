export const createConversationPayload = (userMessage) => {
  return {
    conversation: [
      {
        type: "user",
        message: userMessage,
      },
      {
        type: "assistant",
        message: "Sure, here it is",
      },
    ],
  };
};
