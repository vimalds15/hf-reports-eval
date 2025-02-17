import Logo from "../assets/hf.svg";

const SideNavBarTitle = () => {
  return (
    <div className="flex items-center gap-3">
      <img src={Logo} className="h-8 w-8" alt="Logo" />
      <p className="font-semibold text-xl">Reports</p>
    </div>
  );
};

export default SideNavBarTitle;
