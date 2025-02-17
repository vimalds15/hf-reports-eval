const SideNavActionButton = ({ onCreateNewMetric, onCreateNewReport }) => {
  return (
    <div className="flex flex-col gap-2 pt-4">
      <div
        onClick={onCreateNewMetric}
        className="bg-gradient-primary text-white px-4 py-2 rounded-md cursor-pointer"
      >
        Create a New Metric
      </div>
      <div
        onClick={onCreateNewReport}
        className="bg-black text-white px-4 py-2 rounded-md cursor-pointer"
      >
        Create a New Report
      </div>
    </div>
  );
};

export default SideNavActionButton;
