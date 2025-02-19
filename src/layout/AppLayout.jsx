const AppLayout = ({ children }) => {
  return (
    <div className="flex max-h-screen max-w-[1680px] mx-auto bg-[#fff]">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AppLayout;
