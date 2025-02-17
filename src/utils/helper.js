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

export const getLayout = (report) => {
  if (report.properties?.layout?.length) {
    return report.properties.layout;
  }

  return report.components.map((component) => [component.id]);
};

export const mapLayoutToComponents = (layout, report) => {
  const componentMap = new Map(
    report.components.map((comp) => [comp.id, comp])
  );

  return layout.map((row) => row.map((id) => componentMap.get(id)));
};
