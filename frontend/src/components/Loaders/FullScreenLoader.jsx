import { FadeLoader } from "react-spinners";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 z-50">
      <FadeLoader size={80} color="#178746" speedMultiplier={1.5} />
    </div>
  );
};

export default FullScreenLoader;
