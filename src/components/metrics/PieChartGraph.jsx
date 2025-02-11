import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const PieChartGraph = ({ data, preview, fullScreen }) => {
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#d0ed57",
    "#a4de6c",
    "#ff85a2",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#6A4C93",
    "#2E91E5",
    "#E15F99",
    "#73B06F",
  ];

  return (
    <>
      <ResponsiveContainer
        width="100%"
        height={preview ? 200 : fullScreen ? 500 : 300}
      >
        <PieChart>
          <Pie
            data={data.data}
            nameKey={Object.keys(data?.data[0])[0]}
            dataKey={Object.keys(data?.data[0])[1]}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={true}
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
    </>
  );
};

export default PieChartGraph;
