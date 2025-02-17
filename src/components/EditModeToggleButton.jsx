import { useEditModeContext } from "../services/context";

const EditModeToggleButton = ({ newMetric, newReport }) => {
  const { isEditEnabled, setIsEditEnabled } = useEditModeContext();

  const handleToggle = () => {
    setIsEditEnabled((prev) => !prev);
  };
  return (
    <div
      className={`flex-1 flex items-center justify-end ${
        (newMetric || newReport) && "invisible"
      }`}
    >
      <p className="text-sm mb-2 -mt-[30px] mr-2 font-semibold text-gray-600">
        Edit
      </p>
      <button
        onClick={handleToggle}
        className={`w-10 h-5 flex items-center px-1 rounded-full transition-all duration-300 mb-2 -mt-8 ${
          isEditEnabled
            ? "bg-gradient-primary justify-end"
            : "bg-gray-300 justify-start"
        }`}
      >
        <div className="w-3 h-3 bg-white rounded-full shadow-md" />
      </button>
    </div>
  );
};

export default EditModeToggleButton;
