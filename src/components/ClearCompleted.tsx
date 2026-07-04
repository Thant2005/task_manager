import { useAuthContext } from "../contexts/authContext";
import { useCompleted } from "../hooks/useTasks";

function ClearCompleted() {
  const { user } = useAuthContext();
  const { mutate } = useCompleted(user?.id);
  return (
    <div className="md:mt-6 mt-3 flex justify-end">
      <button
        onClick={() => mutate()}
        className="px-4 py-2 rounded-full cursor-pointer hover:bg-surface  border border-zinc-300"
      >
        Clear Completed
      </button>
    </div>
  );
}

export default ClearCompleted;
