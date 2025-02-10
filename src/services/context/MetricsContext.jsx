import { createContext, useContext, useState } from 'react';

const MetricsContext = createContext();

export const MetricsProvider = ({ children }) => {
  const [metrics, setMetrics] = useState([]);

  return (
    <MetricsContext.Provider value={{ metrics, setMetrics }}>
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => useContext(MetricsContext);
