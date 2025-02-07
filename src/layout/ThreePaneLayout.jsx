const ThreePaneLayout = ({ left, middle, right }) => {
  return (
    <div className="flex h-full w-full">
      {left}
      {middle}
      {right}
    </div>
  );
};

export default ThreePaneLayout;
