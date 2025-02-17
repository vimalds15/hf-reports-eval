const CanvasHeaderTitle = ({ title }) => {
  if (!title) return;
  return (
    <p className="flex-1 text-lg font-semibold text-center mb-2 -mt-8">
      {title}
    </p>
  );
};

export default CanvasHeaderTitle;
