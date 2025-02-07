import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const PieChartGraph = ({ data }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4">{data.title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data.data}
            dataKey="tickets"
            nameKey="month"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartGraph;
