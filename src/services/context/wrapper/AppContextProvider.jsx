import {
  ActiveItemProvider,
  CanvasDetailsProvider,
  ReportsProvider,
  MetricsProvider,
  PropertyItemProvider,
  EditModeProvider,
} from "../";

const AppContextProvider = ({ children }) => {
  return (
    <ActiveItemProvider>
      <CanvasDetailsProvider>
        <ReportsProvider>
          <MetricsProvider>
            <PropertyItemProvider>
              <EditModeProvider>{children}</EditModeProvider>
            </PropertyItemProvider>
          </MetricsProvider>
        </ReportsProvider>
      </CanvasDetailsProvider>
    </ActiveItemProvider>
  );
};

export default AppContextProvider;
