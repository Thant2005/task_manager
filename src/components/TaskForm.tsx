import { useState } from "react";
import { useAddTask } from "../hooks/useTasks";

function TaskForm() {
  const [title, setTitle] = useState("");

  const { isPending, mutate: addTask } = useAddTask();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    addTask(title);
    setTitle("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-3 md:mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="add-task-input">
          New Task
        </label>
        <input
          value={title}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="w-full px-5 py-3 bg-surface transition focus:bg-white focus:border focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 rounded-lg outline-0 border border-line"
          placeholder="What need to be done?"
        />

        <button
          disabled={isPending}
          type="submit"
          className="bg-ink cursor-pointer hover:bg-zinc-800 flex justify-center items-center  text-center text-white rounded-xl px-5 py-3 text-sm font-medium "
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
