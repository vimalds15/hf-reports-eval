import {
  getAllMetrics,
  getAllReports,
  getMetricsById,
  getReportById,
} from "../mock/api";

export const NAV_SECTIONS = [
  {
    key: "reports",
    label: null,
    fetchAll: getAllReports,
    fetchById: getReportById,
  },
  {
    key: "metrics",
    label: "Metrics",
    fetchAll: getAllMetrics,
    fetchById: getMetricsById,
  },
];
