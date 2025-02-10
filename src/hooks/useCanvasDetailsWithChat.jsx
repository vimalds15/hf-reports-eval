import { useEffect, useState } from "react";
import { getRandomMetric } from "../mock/api";
import { createConversationPayload } from "../utils/helper";

const useReportDetailsWithChat = (
  title,
  setTitle,
  description,
  setDescription,
  newMetric,
  newReport,
  reportChat,
  setReportMetrics,
  setReportChat,
  activeItem,
  setPropertyItem
) => {
  const [showConversationBar, setShowConversationBar] = useState(false);

  useEffect(() => {
    if (activeItem) {
      setTitle(activeItem?.title || "Untitled");
      setDescription(activeItem?.description || "Untitled Description");
      if (!newMetric && !newReport) {
        setReportMetrics(activeItem?.components || []);
      }
    }
  }, [activeItem, newMetric, newReport, setReportMetrics]);

  const chatSubmitHandler = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements["chat-message"].value.trim();
    if (!inputValue) return;

    const payload = createConversationPayload(inputValue);

    let response = getRandomMetric(payload);
    response = {
      ...response,
      conversation: [...reportChat, ...payload.conversation],
    };

    setReportChat((prev) => [...prev, ...payload.conversation]);

    if (newMetric) {
      setReportMetrics([response]);
    } else {
      setReportMetrics((prev) => [...prev, response]);
    }

    setPropertyItem(response);
    e.target.reset();
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    showConversationBar,
    setShowConversationBar,
    chatSubmitHandler,
  };
};

export default useReportDetailsWithChat;
