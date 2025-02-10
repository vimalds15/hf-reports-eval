import { createContext, useContext, useState } from "react";

const CanvasDetailsContext = createContext();

export const CanvasDetailsProvider = ({ children }) => {
  const [canvasTitle, setCanvasTitle] = useState("");
  const [canvasDescription, setCanvasDescription] = useState("");
  const [canvasMetrics, setCanvasMetrics] = useState([]);

  return (
    <CanvasDetailsContext.Provider
      value={{
        canvasTitle,
        setCanvasTitle,
        canvasDescription,
        setCanvasDescription,
        canvasMetrics,
        setCanvasMetrics,
      }}
    >
      {children}
    </CanvasDetailsContext.Provider>
  );
};

export const useCanvasDetails = () => useContext(CanvasDetailsContext);
