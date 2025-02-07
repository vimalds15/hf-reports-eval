import { useEffect, useState } from "react";
import {
  getAllMetrics,
  getAllReports,
  getMetricsById,
  getReportById,
} from "../mock/api";
import Logo from "../assets/hf.svg";

const SideNavBarPane = ({
  setActiveItem,
  setNewReport,
  setNewMetric,
  setPropertyItem,
  reports,
  metrics,
  setReports,
  setMetrics,
}) => {
  const [active, setActive] = useState(null);

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
    console.log(response);
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
          <div className="flex flex-col gap-1">
            {reports?.map((item) => (
              <div
                key={item.id}
                onClick={() => selectSideMenuItemHandler(item.id, "report")}
                className={`px-4 py-1 rounded truncate hover:bg-gray-200 cursor-pointer ${
                  item.id === active && "bg-gray-300 hover:bg-gray-300"
                }`}
              >
                {item?.title}
              </div>
            ))}
          </div>
          <div className="my-4 h-0.5 w-full bg-gray-200" />
          <div>
            <p className="font-semibold mb-2">Metrics</p>
            <div className="flex flex-col gap-1">
              {metrics?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => selectSideMenuItemHandler(item.id, "metric")}
                  className={`px-4 py-1 rounded truncate hover:bg-gray-200 cursor-pointer ${
                    item.id === active && "bg-gray-300 hover:bg-gray-300"
                  }`}
                >
                  {item?.title}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div
            onClick={createNewMetricHandler}
            className="bg-gradient-primary text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Create a New Metric
          </div>
          <div
            onClick={createNewReportHandler}
            className="bg-black text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Create a New Report
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBarPane;
