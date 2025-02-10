export const getRandomMetric = async () => {
  const metrics = await getAllMetrics();
  const randomIndex = Math.floor(Math.random() * metrics.length);
  const metric = metrics[randomIndex];

  const newMetric = {
    ...metric,
    conversation: [],
    id: Math.floor(Math.random() * 10000),
  };

  return newMetric;
};

const API_BASE_URL = "http://localhost:5001";

export const getAllReports = async () => {
  const response = await fetch(`${API_BASE_URL}/reports`);
  return response.json();
};

export const getReportById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/reports/${id}`);
  return response.json();
};

export const createReport = async (reportData) => {
  const response = await fetch(`${API_BASE_URL}/reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reportData),
  });
  return response.json();
};

export const updateReport = async (id, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

export const deleteReport = async (id) => {
  const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getAllMetrics = async () => {
  const response = await fetch(`${API_BASE_URL}/metrics`);
  return response.json();
};

export const getMetricsById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/metrics/${id}`);
  return response.json();
};

export const createMetric = async (metricData) => {
  const response = await fetch(`${API_BASE_URL}/metrics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(metricData),
  });
  return response.json();
};

export const updateMetric = async (id, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/metrics/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

export const deleteMetric = async (id) => {
  const response = await fetch(`${API_BASE_URL}/metrics/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
