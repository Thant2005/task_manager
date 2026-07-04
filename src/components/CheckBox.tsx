import type React from "react";
import { useToggleTask } from "../hooks/useTasks";
import { useAuthContext } from "../contexts/authContext";

function CheckBox({ id, isCheck }: { id: string; isCheck: boolean }) {
  const { user } = useAuthContext();
  const { mutate: toogleTask, isPending } = useToggleTask(user?.id);

  return (
    <label>
      <input
        disabled={isPending}
        type="checkbox"
        checked={isCheck}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          toogleTask({ id, currentStatus: e.target.checked })
        }
        className="peer sr-only"
      />

      <div className="w-5 peer-checked:bg-ink h-5 peer-checked:border-none transition-all border-3 [&>svg]:hidden peer-checked:[&>svg]:block border-zinc-400 flex items-center cursor-pointer  hover:border-zinc-600  rounded-sm">
        <svg
          className="text-red-500 peer-checked:text-white"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#fff"
        >
          <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
        </svg>
      </div>
    </label>
  );
}

export default CheckBox;
