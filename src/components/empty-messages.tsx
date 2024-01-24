import { TbMoodEmpty } from "react-icons/tb";

const EmptyMessages = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 h-screen text-muted-foreground">
      <TbMoodEmpty size={48} />
      <span className="font-bold tracking-widest text-2xl">Empty Chat!</span>
    </div>
  );
};

export default EmptyMessages;
