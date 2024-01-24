import { CgSpinner } from 'react-icons/cg'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <CgSpinner size={28} className="animate-spin" />
    </div>
  );
};

export default Spinner;
