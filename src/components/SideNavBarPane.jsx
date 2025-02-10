import { useEffect, useState } from "react";
import {
  getAllMetrics,
  getAllReports,
  getMetricsById,
  getReportById,
} from "../mock/api";
import Logo from "../assets/hf.svg";
import SideNavActionButton from "./SideNavActionButton";
import SideNavMenuItem from "./SideNavMenuItem";
import {
  useReportsContext,
  useMetricsContext,
  useActiveItemContext,
  usePropertyItemContext,
} from "../services/context";

const SideNavBarPane = ({ setNewReport, setNewMetric }) => {
  const [active, setActive] = useState(null);
  const { setActiveItem } = useActiveItemContext();
  const { reports, setReports } = useReportsContext();
  const { metrics, setMetrics } = useMetricsContext();
  const { setPropertyItem } = usePropertyItemContext();

  const createNewMetricHandler = () => {
    setNewMetric(true);
    setNewReport(false);
    setActiveItem({});
    setActive(null);
  };

  const createNewReportHandler = () => {
    setNewReport(true);
    setNewMetric(false);
    setActive(null);
    setActiveItem({});
  };

  const selectSideMenuItemHandler = async (id, type) => {
    if (type === "metric") {
      await fetchMetricById(id);
    } else {
      await fetchReportById(id);
    }
    setNewReport(false);
    setNewMetric(false);
    setActive(id);
  };

  const fetchReportById = async (id) => {
    const response = await getReportById(id);
    setActiveItem(response);
    setPropertyItem(response);
  };

  const fetchMetricById = async (id) => {
    const response = await getMetricsById(id);
    setActiveItem(response);
    setPropertyItem(response);
  };

  const fetchReportAllReports = async () => {
    const response = await getAllReports();
    setReports(response);
  };

  const fetchReportAllMetrics = async () => {
    const response = await getAllMetrics();
    setMetrics(response);
  };

  useEffect(() => {
    fetchReportAllReports();
    fetchReportAllMetrics();
  }, []);

  return (
    <div className="flex flex-col justify-between w-fit max-w-56 min-w-56 p-4 shadow-lg">
      <div className="flex items-center gap-2">
        <img src={Logo} className="h-8 w-8" />
        <p className="font-semibold">Reports</p>
      </div>

      <div className="mt-12 flex flex-col justify-between h-full">
        <div className="h-full">
          <div className="max-h-[30vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col gap-1">
              {reports?.map((report) => (
                <SideNavMenuItem
                  key={report.id}
                  item={report}
                  active={active}
                  onClick={(id) => selectSideMenuItemHandler(id, "report")}
                />
              ))}
            </div>
          </div>
          <div className="my-4 h-0.5 w-full bg-gray-200" />
          <div>
            <p className="font-semibold mb-2">Metrics</p>
            <div className="max-h-[35vh] overflow-scroll no-scrollbar">
              <div className="flex flex-col gap-1 overflow-y-scroll">
                {metrics?.map((metric) => (
                  <SideNavMenuItem
                    key={metric.id}
                    item={metric}
                    active={active}
                    onClick={(id) => selectSideMenuItemHandler(id, "metric")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <SideNavActionButton
            onCreateNewMetric={createNewMetricHandler}
            onCreateNewReport={createNewReportHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default SideNavBarPane;
