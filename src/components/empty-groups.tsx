import { TbMoodEmpty } from "react-icons/tb";

const EmptyGroups = () => {
  return (
    <div className="flex items-center justify-center space-x-2 py-4 text-muted-foreground">
      <TbMoodEmpty size={24} />
      <span className="font-bold tracking-widest text-md uppercase">No Groups Found...</span>
    </div>
  );
};

export default EmptyGroups;
