import { MdAddCircleOutline } from "react-icons/md";

const ImportMetricButton = ({ setShowImportModal }) => {
  return (
    <div
      onClick={() => setShowImportModal(true)}
      className="flex flex-col items-center gap-1 justify-center bg-[#ff7a00]/20 my-4 p-4 rounded-lg cursor-pointer text-sm"
    >
      <MdAddCircleOutline size={24} />
      <p>Import Metrics</p>
    </div>
  );
};

export default ImportMetricButton;
