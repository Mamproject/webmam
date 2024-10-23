import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="grid place-items-center pt-[10vh]">
      <Spinner className="h-40 w-40 text-purple" />
    </div>
  );
}
