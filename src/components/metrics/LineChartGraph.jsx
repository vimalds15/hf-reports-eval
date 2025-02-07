import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartGraph = ({ data }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl w-full">
      <h2 className="text-xl font-semibold mb-4">{data.title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data.data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartGraph;
