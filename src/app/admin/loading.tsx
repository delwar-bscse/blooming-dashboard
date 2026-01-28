import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <h1 className="text-xl font-medium flex items-center gap-4">
        <Loader className="animate-spin" /> Loading...
      </h1>
    </div>
  );
};

export default Loading;
