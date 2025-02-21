import {
  BarChartGraph,
  LineChartGraph,
  PieChartGraph,
  RadarChartGraph,
  AreaChartGraph,
  Charts,
  PivotTableChart,
  KPICard,
} from "../components/metrics";

export const COMPONENTS_MAP = {
  line_chart: LineChartGraph,
  bar_chart: BarChartGraph,
  radar_chart: RadarChartGraph,
  pie_chart: PieChartGraph,
  area_chart: AreaChartGraph,
  charts: Charts,
  pivot_table: PivotTableChart,
  kpi_card: KPICard,
};
