import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const BarChartGraph = ({ data }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4">{data?.title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data?.data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="profit" fill="#82ca9d" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartGraph;
