import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartGraph = ({ data, preview, fullScreen }) => {
  return (
    <>
      <ResponsiveContainer
        width="100%"
        height={preview ? 200 : fullScreen ? 500 : 300}
      >
        <LineChart
          data={data.data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={Object.keys(data?.data[0])[0]} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={Object.keys(data?.data[0])[1]}
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartGraph;
