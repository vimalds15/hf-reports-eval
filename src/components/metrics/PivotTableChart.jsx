import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { useState } from "react";

const PlotlyRenderers = createPlotlyRenderers(Plot);

const data = [
  [
    "Ticket ID",
    "Issue Type",
    "Priority",
    "Status",
    "Assigned Agent",
    "Resolution Time (hrs)",
  ],
  ["T001", "Login Issue", "High", "Resolved", "Alice", 2],
  ["T002", "Network Down", "Critical", "Pending", "Bob", null],
  ["T003", "Software Crash", "Medium", "Resolved", "Charlie", 5],
  ["T004", "Password Reset", "Low", "Resolved", "Alice", 1],
  ["T005", "Email Not Working", "High", "In Progress", "Dave", null],
  ["T006", "Hardware Failure", "Critical", "Pending", "Eve", null],
  ["T007", "VPN Issue", "Medium", "Resolved", "Bob", 3],
  ["T008", "Slow Performance", "Low", "Resolved", "Charlie", 6],
  ["T009", "Access Denied", "High", "Resolved", "Alice", 2.5],
  ["T010", "Bug Report", "Medium", "Pending", "Dave", null],
];

const PivotTableChart = ({ inputData }) => {
  const [pivotState, setPivotState] = useState({});

  return (
    <div className="max-w-[80vw] mt-6 overflow-scroll min-h-[350px]">
      <PivotTableUI
        data={data}
        onChange={setPivotState}
        renderers={{ ...TableRenderers, ...PlotlyRenderers }}
        plotlyOptions={{ height: 400, width: "100%" }}
        {...pivotState}
      />
    </div>
  );
};

export default PivotTableChart;
