import { useState } from "react";
import {
  ProperitesPane,
  ReportCanvasPane,
  SideNavBarPane,
} from "../../components";
import { ThreePaneLayout } from "../../layout";
import { createMetric, createReport } from "../../mock/api";
import { ActiveItemProvider } from "../../services/context/ActiveItemContext";
import { CanvasDetailsProvider } from "../../services/context/CanvasDetailsContext";
import { ReportsProvider } from "../../services/context/ReportsContext";
import { MetricsProvider } from "../../services/context/MetricsContext";
import { PropertyItemProvider } from "../../services/context/PropertyItemContext";
import { CanvasChatProvider } from "../../services/context/CanvasChatContext";

const HomePage = () => {
  const [reportChat, setReportChat] = useState([]);
  const [newMetric, setNewMetric] = useState([]);
  const [newReport, setNewReport] = useState([]);

  return (
    <ActiveItemProvider>
      <CanvasDetailsProvider>
        <ReportsProvider>
          <MetricsProvider>
            <PropertyItemProvider>
              <CanvasChatProvider>
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
                        reportChat={reportChat}
                        setReportChat={setReportChat}
                      />
                    }
                    right={
                      <ProperitesPane reportChat={reportChat}  />
                    }
                  />
                </div>
              </CanvasChatProvider>
            </PropertyItemProvider>
          </MetricsProvider>
        </ReportsProvider>
      </CanvasDetailsProvider>
    </ActiveItemProvider>
  );
};

export default HomePage;
