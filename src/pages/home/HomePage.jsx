import { useState } from "react";
import {
  ProperitesPane,
  ReportCanvasPane,
  SideNavBarPane,
} from "../../components";
import { ThreePaneLayout } from "../../layout";
import {
  ActiveItemProvider,
  CanvasDetailsProvider,
  ReportsProvider,
  MetricsProvider,
  PropertyItemProvider,
  EditModeProvider,
} from "../../services/context";

const HomePage = () => {
  const [newMetric, setNewMetric] = useState(false);
  const [newReport, setNewReport] = useState(false);

  return (
    <ActiveItemProvider>
      <CanvasDetailsProvider>
        <ReportsProvider>
          <MetricsProvider>
            <PropertyItemProvider>
              <EditModeProvider>
                <div>
                  <ThreePaneLayout
                    left={
                      <SideNavBarPane
                        setNewMetric={setNewMetric}
                        setNewReport={setNewReport}
                      />
                    }
                    middle={
                      <ReportCanvasPane
                        newMetric={newMetric}
                        newReport={newReport}
                      />
                    }
                    right={
                      <ProperitesPane
                        newMetric={newMetric}
                        newReport={newReport}
                      />
                    }
                  />
                </div>
              </EditModeProvider>
            </PropertyItemProvider>
          </MetricsProvider>
        </ReportsProvider>
      </CanvasDetailsProvider>
    </ActiveItemProvider>
  );
};

export default HomePage;
