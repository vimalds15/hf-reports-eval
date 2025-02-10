import { createContext, useContext, useEffect, useState } from "react";

const CanvasDetailsContext = createContext();

export const CanvasDetailsProvider = ({ children }) => {
  const [canvasTitle, setCanvasTitle] = useState("");
  const [canvasDescription, setCanvasDescription] = useState("");
  const [canvasMetrics, setCanvasMetrics] = useState([]);
  const [canvasChat, setCanvasChat] = useState([]);

  return (
    <CanvasDetailsContext.Provider
      value={{
        canvasTitle,
        setCanvasTitle,
        canvasDescription,
        setCanvasDescription,
        canvasMetrics,
        setCanvasMetrics,
        canvasChat,
        setCanvasChat,
      }}
    >
      {children}
    </CanvasDetailsContext.Provider>
  );
};

export const useCanvasDetailsContext = () => useContext(CanvasDetailsContext);
