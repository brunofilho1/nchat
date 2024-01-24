import { TbMoodEmpty } from "react-icons/tb";

const EmptyMessages = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2 text-muted-foreground">
      <TbMoodEmpty size={48} />
      <span className="font-bold tracking-widest text-2xl">Empty Chat!</span>
    </div>
  );
};

export default EmptyMessages;
