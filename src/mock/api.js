import { metrics, reports } from "./constant";

// export const getReportById = (id) => {
//   return reports.find((item) => item.id === id);
// };

// export const getAllReports = () => {
//   return reports;
// };

// export const getMetricsById = (id) => {
//   return metrics.find((item) => item.id === id);
// };

// export const getAllMetrics = () => {
//   return metrics;
// };

export const getRandomMetric = () => {
  const randomIndex = Math.floor(Math.random() * metrics.length);
  const metric = metrics[randomIndex];

  const newMetric = {
    ...metric,
    id: Math.floor(Math.random() * 10000),
  };

  return newMetric;
};

const API_BASE_URL = "http://0.0.0.0:5001"; // Base URL for the API

// Fetch all reports
export const getAllReports = async () => {
  const response = await fetch(`${API_BASE_URL}/reports`);
  return response.json();
};

// Fetch a single report by ID
export const getReportById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/reports/${id}`);
  return response.json();
};

// Create a new report
export const createReport = async (reportData) => {
  const response = await fetch(`${API_BASE_URL}/reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reportData),
  });
  return response.json();
};

// Update an existing report
export const updateReport = async (id, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

// Delete a report
export const deleteReport = async (id) => {
  const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

// Fetch all metrics
export const getAllMetrics = async () => {
  const response = await fetch(`${API_BASE_URL}/metrics`);
  return response.json();
};

// Fetch a single metric by ID
export const getMetricsById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/metrics/${id}`);
  return response.json();
};

// Create a new metric
export const createMetric = async (metricData) => {
  const response = await fetch(`${API_BASE_URL}/metrics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(metricData),
  });
  return response.json();
};

// Update an existing metric
export const updateMetric = async (id, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/metrics/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

// Delete a metric
export const deleteMetric = async (id) => {
  const response = await fetch(`${API_BASE_URL}/metrics/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
