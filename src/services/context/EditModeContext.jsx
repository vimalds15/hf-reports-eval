import { createContext, useContext, useState } from "react";

const EditModeContext = createContext();

export const EditModeProvider = ({ children }) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  return (
    <EditModeContext.Provider value={{ isEditEnabled, setIsEditEnabled }}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditModeContext = () => useContext(EditModeContext);
