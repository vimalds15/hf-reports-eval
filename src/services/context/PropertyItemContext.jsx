import { createContext, useContext, useState } from "react";

const PropertyItemContext = createContext();

export const PropertyItemProvider = ({ children }) => {
  const [propertyItem, setPropertyItem] = useState({});

  return (
    <PropertyItemContext.Provider value={{ propertyItem, setPropertyItem }}>
      {children}
    </PropertyItemContext.Provider>
  );
};

export const usePropertyItem = () => useContext(PropertyItemContext);
