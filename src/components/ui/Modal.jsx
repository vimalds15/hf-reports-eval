import { useEffect } from "react";

const Modal = ({ isOpen, setIsOpen, fullScreen = false, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 bg-[#00000070] backdrop-blur-sm flex items-center justify-center z-30"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`backdrop-blur-xl rounded-xl shadow-lg ${
          fullScreen
            ? "min-h-screen bg-white w-full"
            : "bg-white/85 max-w-[70%] w-full "
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
