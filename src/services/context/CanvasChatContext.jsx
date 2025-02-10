import { createContext, useContext, useState } from "react";

const CanvasChatContext = createContext();

export const CanvasChatProvider = ({ children }) => {
  const [canvasChat, setCanvasChat] = useState([]);

  return (
    <CanvasChatContext.Provider value={{ canvasChat, setCanvasChat }}>
      {children}
    </CanvasChatContext.Provider>
  );
};

export const useCanvasChat = () => useContext(CanvasChatContext);
