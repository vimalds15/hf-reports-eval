import { useState } from "react";
import SideNavActionButton from "./SideNavActionButton";
import { useActiveItemContext, useEditModeContext } from "../services/context";
import SideNavBarTitle from "./SideNavBarTitle";
import SideNavBarMenu from "./SideNavBarMenu";

const SideNavBarPane = ({ setNewReport, setNewMetric }) => {
  const [active, setActive] = useState("");
  const { setActiveItem } = useActiveItemContext();

  const { setIsEditEnabled } = useEditModeContext();

  const handleNewItem = (type) => {
    setIsEditEnabled(true);
    setNewReport(type === "reports");
    setNewMetric(type === "metrics");
    setActive("");
    setActiveItem({});
  };

  return (
    <div className="flex flex-col h-screen w-fit max-w-56 min-w-56 p-4 shadow-lg">
      <SideNavBarTitle />
      <SideNavBarMenu
        active={active}
        setActive={setActive}
        setNewMetric={setNewMetric}
        setNewReport={setNewReport}
      />
      <SideNavActionButton
        onCreateNewMetric={() => handleNewItem("metrics")}
        onCreateNewReport={() => handleNewItem("reports")}
      />
    </div>
  );
};

export default SideNavBarPane;
