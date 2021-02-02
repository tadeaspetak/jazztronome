import { Spinner } from "./Spinner";

export const Button: React.FC<{
  isLoading?: boolean;
  label: string;
  type: "button" | "submit";
}> = ({ isLoading, label, type }) => {
  return (
    <button
      className="flex justify-center w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      type={type}
    >
      {isLoading ? <Spinner /> : <span>{label}</span>}
    </button>
  );
};
