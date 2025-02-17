import React from "react";

const PropertiesSectionTab = ({ label, isSelected, clickHandler }) => {
  return (
    <div className="flex items-stretch justify-stretch w-full">
      <div
        onClick={clickHandler}
        className={`flex-1 min-w-32 text-center text-sm px-6 py-1 cursor-pointer ${
          isSelected ? "bg-black text-white rounded" : ""
        }`}
      >
        {label}
      </div>
    </div>
  );
};

export default PropertiesSectionTab;
