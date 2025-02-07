import {
  BarChartGraph,
  LineChartGraph,
  PieChartGraph,
  RadarChartGraph,
  AreaChartGraph,
} from "../components/metrics";

export const componentsMap = {
  line_chart: LineChartGraph,
  bar_chart: BarChartGraph,
  radar_chart: RadarChartGraph,
  pie_chart: PieChartGraph,
  area_chart: AreaChartGraph,
};
