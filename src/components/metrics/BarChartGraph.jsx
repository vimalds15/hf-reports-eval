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
      <ResponsiveContainer
        width="100%"
        height={preview ? 200 : fullScreen ? 500 : 300}
      >
        <BarChart
          data={data?.data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={Object.keys(data?.data[0])[0]} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={Object.keys(data?.data[0])[1]}
            fill="#82ca9d"
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarChartGraph;
