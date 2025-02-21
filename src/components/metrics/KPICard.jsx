const KPICard = ({ data }) => {
    console.log(data)
  return (
    <div className="flex items-center justify-between gap-4 mt-6 flex-wrap">
      {data?.data?.map((item) => (
        <div key={item?.id} className="flex-1 flex flex-col gap-16 bg-white p-4 rounded-xl shadow-md">
            <p className="font-semibold text-lg text-nowrap">{item?.title}</p>
            <p className="font-bold text-3xl">{item?.count}</p>
        </div>
      ))}
    </div>
  );
};

export default KPICard;
