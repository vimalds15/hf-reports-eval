import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const RadarChartGraph = ({ data }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4">{data?.title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data?.data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="month" />
          <PolarRadiusAxis />
          <Radar
            name={data.label1}
            dataKey={data.label1.toLowerCase()}
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name={data.label2}
            dataKey={data.label2.toLowerCase()}
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartGraph;
