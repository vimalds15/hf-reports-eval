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

const BarChartGraph = ({ data, preview, fullScreen }) => {
  return (
    <>
      {!preview && (
        <h2 className="text-xl font-semibold mb-4">{data?.title}</h2>
      )}
      <ResponsiveContainer
        width="100%"
        height={preview ? 200 : fullScreen ? 600 : 300}
      >
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
    </>
  );
};

export default BarChartGraph;
