import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AreaChartGraph = ({ data, preview, fullScreen }) => {
  return (
    <>
      {!preview && (
        <h2 className="text-xl font-semibold mb-4">{data?.title}</h2>
      )}
      <ResponsiveContainer
        width="100%"
        height={preview ? 200 : fullScreen ? 600 : 300}
      >
        <AreaChart
          data={data.data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default AreaChartGraph;
