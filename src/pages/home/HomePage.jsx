import { useState } from "react";
import {
  ProperitesPane,
  ReportCanvasPane,
  SideNavBarPane,
} from "../../components";
import { ThreePaneLayout } from "../../layout";
import { AppContextProvider } from "../../services/context/wrapper";

const HomePage = () => {
  const [newMetric, setNewMetric] = useState(false);
  const [newReport, setNewReport] = useState(false);

  return (
    <AppContextProvider>
      <ThreePaneLayout
        left={
          <SideNavBarPane
            setNewMetric={setNewMetric}
            setNewReport={setNewReport}
          />
        }
        middle={
          <ReportCanvasPane newMetric={newMetric} newReport={newReport} />
        }
        right={<ProperitesPane newMetric={newMetric} newReport={newReport} />}
      />
    </AppContextProvider>
  );
};

export default HomePage;
