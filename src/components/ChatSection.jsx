import React from "react";

const ChatSection = ({ propertyItem }) => {
  return (
    <div className="flex flex-col gap-3 w-full mt-4 h-[70vh] overflow-scroll">
      {!propertyItem?.conversation && (
        <p className="text-center text-gray-500 font-semibold">
          Select a Report or Metric to Display
        </p>
      )}
      {propertyItem?.conversation?.map((item, index) => (
        <div
          key={index}
          className={`${
            item?.type === "user" && "ml-auto"
          } bg-gray-100 max-w-[80%] w-fit px-4 py-1.5 rounded-md`}
        >
          <p>{item?.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatSection;
