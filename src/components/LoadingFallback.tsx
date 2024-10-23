import Spinner from "./Spinner";

const LoadingFallback = () => (
  <div className="grid h-full w-full place-items-center pt-[40%]">
    <Spinner className="h-20 w-20 text-purple" />
  </div>
);

export default LoadingFallback;
