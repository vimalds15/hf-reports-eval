import { useState } from "react";
import {
  usePropertyItemContext,
  useEditModeContext,
} from "../services/context";

import PropertiesSectionTab from "./PropertiesTab";
import ChatSection from "./ChatSection";
import PropertiesActionButton from "./PropertiesActionButton";

const ProperitesPane = ({ newMetric, newReport }) => {
  const [isChatSelected, setIsChatSelected] = useState(true);

  const { propertyItem } = usePropertyItemContext();

  const { isEditEnabled } = useEditModeContext();

  return (
    <div
      className={`flex-col justify-between h-screen w-fit min-w-80 max-w-80 p-4 shadow-lg  ${
        isEditEnabled ? "flex" : "hidden"
      }`}
    >
      <div>
        <div className="font-semibold text-center mb-4">Properties</div>

        <div className="flex items-stretch justify-stretch w-full">
          <PropertiesSectionTab
            label={"Chat"}
            isSelected={isChatSelected}
            clickHandler={() => setIsChatSelected(true)}
          />
          <PropertiesSectionTab
            label={"Customize"}
            isSelected={!isChatSelected}
            clickHandler={() => setIsChatSelected(false)}
          />
        </div>

        <div className="h-0.5 w-full bg-gray-200 my-2" />

        {isChatSelected ? (
          <ChatSection propertyItem={propertyItem} />
        ) : (
          <div className="flex items-center justify-center">Coming Soon...</div>
        )}
      </div>

      <PropertiesActionButton newReport={newReport} newMetric={newMetric} />
    </div>
  );
};

export default ProperitesPane;
