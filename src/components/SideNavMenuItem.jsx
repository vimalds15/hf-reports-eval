const SideNavMenuItem = ({ item, active, onClick }) => {
  const isActive = item.id === active;
  return (
    <div
      key={item.id}
      onClick={() => onClick(item.id)}
      className={`px-4 py-1 my-1 rounded truncate hover:bg-gray-200 cursor-pointer ${
        isActive ? "bg-gray-300 hover:bg-gray-300" : ""
      }`}
    >
      {item?.title}
    </div>
  );
};

export default SideNavMenuItem;
