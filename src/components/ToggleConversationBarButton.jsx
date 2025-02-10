import SparkleIcon from "../assets/sparkler.png";

const ToggleConversationBarButton = ({
  setShowConversationBar,
  showConversationBar,
}) => (
  <div
    onClick={() => setShowConversationBar((prev) => !prev)}
    className="absolute bottom-6 right-6 bg-gradient-primary rounded-full overflow-hidden p-2 cursor-pointer"
  >
    <img
      src={SparkleIcon}
      className={`invert h-6 w-6 transition-all ${
        showConversationBar && "rotate-180"
      }`}
    />
  </div>
);

export default ToggleConversationBarButton;
