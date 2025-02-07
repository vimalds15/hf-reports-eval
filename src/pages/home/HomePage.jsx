import { useState } from "react";

import {
  ProperitesPane,
  ReportCanvasPane,
  SideNavBarPane,
} from "../../components";
import { ThreePaneLayout } from "../../layout";
import { createMetric } from "../../mock/api";

const HomePage = () => {
  const [activeItem, setActiveItem] = useState({});
  const [propertyItem, setPropertyItem] = useState({});
  const [newMetric, setNewMetric] = useState(false);
  const [newReport, setNewReport] = useState(false);
  const [reports, setReports] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportMetrics, setReportMetrics] = useState([]);

  const saveNewItemHandler = async (type) => {
    let payload = {
      id: Math.floor(Math.random() * 10000),
      title: reportTitle,
      description: reportDescription,
    };
    if (type === "metric") {
      payload = { ...reportMetrics[0], ...payload };
      await createMetric(payload);
      setMetrics((prev) => [...prev, payload]);
    } else {
      payload = { components: reportMetrics, ...payload };
      setReports((prev) => [...prev, payload]);
    }
  };

  console.log(metrics);

  return (
    <div>
      <ThreePaneLayout
        left={
          <SideNavBarPane
            setNewMetric={setNewMetric}
            setNewReport={setNewReport}
            setActiveItem={setActiveItem}
            reports={reports}
            setReports={setReports}
            metrics={metrics}
            setMetrics={setMetrics}
            setPropertyItem={setPropertyItem}
          />
        }
        middle={
          <ReportCanvasPane
            activeItem={activeItem}
            newMetric={newMetric}
            newReport={newReport}
            propertyItem={propertyItem}
            setPropertyItem={setPropertyItem}
            title={reportTitle}
            description={reportDescription}
            setTitle={setReportTitle}
            setDescription={setReportDescription}
            reportDescription
            reportMetrics={reportMetrics}
            setReportMetrics={setReportMetrics}
          />
        }
        right={
          <ProperitesPane
            propertyItem={propertyItem}
            saveNewItemHandler={saveNewItemHandler}
          />
        }
      />
    </div>
  );
};

export default HomePage;
