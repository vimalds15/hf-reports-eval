const CanvasHeader = ({ title }) => {
  if (!title) return;
  return <p className="text-lg font-semibold text-center mb-2 -mt-8">{title} </p>;
};

export default CanvasHeader;
