import { AnimatePresence, motion } from "framer-motion";
import { useTasks } from "../hooks/useTasks";

import Task from "./Task";
import { useAuthContext } from "../contexts/authContext";

export default function TaskList() {
  const { user } = useAuthContext();
  const { data: tasks, isLoading } = useTasks(user?.id);
  return (
    <>
      <div
        className={`mt-6 ${tasks && tasks?.length > 0 ? "border border-line" : ""} overflow-hidden`}
      >
        {isLoading ? (
          <div
            role="status"
            className="max-w-full animate-pulse p-4 flex gap-2 items-center"
          >
            <h3 className="grow bg-gray-300 w-12.5 h-12.5 mb-3 "></h3>

            <div className="col-span-8 w-full">
              <p className="h-2 bg-gray-300 rounded-full w-[90%] mb-2.5"></p>
              <p className="h-2 bg-gray-300 rounded-full w-[88%] mb-2.5"></p>
              <p className="h-2 bg-gray-300 rounded-full w-[86%] mb-2.5"></p>
            </div>
          </div>
        ) : tasks && tasks.length > 0 ? (
          <ul className=" divide-y divide-line">
            <AnimatePresence>
              {tasks?.map((task) => (
                <motion.li
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <Task task={task} key={task.id} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <p className="text-center text-lg my-4 text-zinc-600">
            No Tasks Found
          </p>
        )}
      </div>
    </>
  );
}
