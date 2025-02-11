import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const RadarChartGraph = ({ data, preview, fullScreen }) => {
  return (
    <>
      <ResponsiveContainer
        width="100%"
        height={preview ? 200 : fullScreen ? 500 : 300}
      >
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data?.data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="month" />
          <PolarRadiusAxis />
          <Radar
            name={Object.keys(data?.data[0])[0].toUpperCase()}
            dataKey={Object.keys(data?.data[0])[0]}
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name={Object.keys(data?.data[0])[1].toUpperCase()}
            dataKey={Object.keys(data?.data[0])[1]}
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

export default RadarChartGraph;
