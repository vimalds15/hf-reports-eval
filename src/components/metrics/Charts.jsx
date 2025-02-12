import { useEffect, useState } from "react";
import BarChartGraph from "./BarChartGraph";
import PieChartGraph from "./PieChartGraph";
import LineChartGraph from "./LineChartGraph";
import AreaChartGraph from "./AreaChartGraph";
import RadarChartGraph from "./RadarChartGraph";

const Charts = ({ data, preview, fullScreen }) => {
  const [chartType, setChartType] = useState("");

  const getChartOptions = (subComponents) => {
    return subComponents?.map((item) => ({
      label: item
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      value: item,
    }));
  };

  const options = getChartOptions(data?.supported_sub_components);

  useEffect(() => {
    setChartType(data?.sub_component_type);
  }, [data?.sub_component_type, setChartType]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex mt-2">
        <div>
          {!preview && (
            <h2 className="text-xl font-semibold mb-4">{data?.title}</h2>
          )}
        </div>
        <div className="w-[240px] ml-auto ">
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="w-full p-2 border rounded-md bg-white focus:outline-none"
          >
            {options?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        {chartType === "bar_chart" && (
          <BarChartGraph
            data={data}
            preview={preview}
            fullScreen={fullScreen}
          />
        )}
        {chartType === "pie_chart" && (
          <PieChartGraph
            data={data}
            preview={preview}
            fullScreen={fullScreen}
          />
        )}
        {chartType === "line_chart" && (
          <LineChartGraph
            data={data}
            preview={preview}
            fullScreen={fullScreen}
          />
        )}
        {chartType === "area_chart" && (
          <AreaChartGraph
            data={data}
            preview={preview}
            fullScreen={fullScreen}
          />
        )}
        {chartType === "radar_chart" && (
          <RadarChartGraph
            data={data}
            preview={preview}
            fullScreen={fullScreen}
          />
        )}
      </div>
    </div>
  );
};

export default Charts;
