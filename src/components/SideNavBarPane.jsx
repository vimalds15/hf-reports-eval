import { useEffect, useState, useCallback } from "react";
import Logo from "../assets/hf.svg";
import SideNavActionButton from "./SideNavActionButton";
import SideNavMenuItem from "./SideNavMenuItem";
import {
  useReportsContext,
  useMetricsContext,
  useActiveItemContext,
  usePropertyItemContext,
  useEditModeContext,
} from "../services/context";
import { NAV_SECTIONS } from "../constants";

const SideNavBarPane = ({ setNewReport, setNewMetric }) => {
  const [active, setActive] = useState("");
  const { setActiveItem } = useActiveItemContext();
  const { reports, setReports } = useReportsContext();
  const { metrics, setMetrics } = useMetricsContext();
  const { setPropertyItem } = usePropertyItemContext();
  const { setIsEditEnabled } = useEditModeContext();

  const contextSetters = { reports: setReports, metrics: setMetrics };

  const handleNewItem = (type) => {
    setIsEditEnabled(true);
    setNewReport(type === "reports");
    setNewMetric(type === "metrics");
    setActive("");
    setActiveItem({});
  };

  const selectSideMenuItemHandler = useCallback(
    async (id, type) => {
      const section = NAV_SECTIONS?.find((s) => s.key === type);
      if (section) {
        const response = await section.fetchById(id);
        setActiveItem(response);
        setPropertyItem(response);
      }
      setNewReport(false);
      setNewMetric(false);
      setActive(id);
    },
    [setActiveItem, setPropertyItem, setNewReport, setNewMetric]
  );

  useEffect(() => {
    NAV_SECTIONS.forEach(async ({ key, fetchAll }) => {
      const response = await fetchAll();
      contextSetters[key]?.(response);
    });
  }, []);

  return (
    <div className="flex flex-col h-screen w-fit max-w-56 min-w-56 p-4 shadow-lg">
      <div className="flex items-center gap-3">
        <img src={Logo} className="h-8 w-8" alt="Logo" />
        <p className="font-semibold text-xl">Reports</p>
      </div>

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

      <div className="pt-4">
        <SideNavActionButton
          onCreateNewMetric={() => handleNewItem("metrics")}
          onCreateNewReport={() => handleNewItem("reports")}
        />
      </div>
    </div>
  );
};

export default SideNavBarPane;
