import { createContext, useContext, useState } from "react";

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);

  return (
    <ReportsContext.Provider value={{ reports, setReports }}>
      {children}
    </ReportsContext.Provider>
  );
};

// Custom hook to use reports context
export const useReports = () => useContext(ReportsContext);
