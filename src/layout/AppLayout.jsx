const AppLayout = ({ children }) => {
  return (
    <div className="flex max-h-screen bg-[#fff]">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AppLayout;
