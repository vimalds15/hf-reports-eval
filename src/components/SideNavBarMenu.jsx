import { useEffect } from "react";
import { NAV_SECTIONS } from "../constants";
import {
  useActiveItemContext,
  useMetricsContext,
  usePropertyItemContext,
  useReportsContext,
} from "../services/context";
import SideNavMenuItem from "./SideNavMenuItem";

const SideNavBarMenu = ({ active, setActive, setNewMetric, setNewReport }) => {
  const { reports, setReports } = useReportsContext();
  const { metrics, setMetrics } = useMetricsContext();
  const { setPropertyItem } = usePropertyItemContext();
  const { setActiveItem } = useActiveItemContext();

  const contextSetters = { reports: setReports, metrics: setMetrics };

  const selectSideMenuItemHandler = async (id, type) => {
    const section = NAV_SECTIONS?.find((s) => s.key === type);
    if (section) {
      const response = await section.fetchById(id);
      setActiveItem(response);
      setPropertyItem(response);
    }
    setNewReport(false);
    setNewMetric(false);
    setActive(id);
  };

  useEffect(() => {
    NAV_SECTIONS.forEach(async ({ key, fetchAll }) => {
      const response = await fetchAll();
      contextSetters[key]?.(response);
    });
  }, []);

  return (
    <div className="flex-1 overflow-hidden mt-12 flex flex-col">
      {NAV_SECTIONS.map(({ key, label }, index) => (
        <div key={key} className="min-h-0 flex flex-col">
          <p className="font-semibold mb-2">{label}</p>
          <div
            className={`${
              index !== 0 ? "flex-1" : "max-h-[35vh]"
            } min-h-0 overflow-y-auto no-scrollbar`}
          >
            {(key === "reports" ? reports : metrics)?.map((item) => (
              <SideNavMenuItem
                key={item.id}
                item={item}
                active={active}
                onClick={(id) => selectSideMenuItemHandler(id, key)}
              />
            ))}
          </div>

          {index !== NAV_SECTIONS.length - 1 && (
            <div className="my-4 h-0.5 w-full bg-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
};

export default SideNavBarMenu;
