import ClearCompleted from "../components/ClearCompleted";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function TaskDashboard() {
  const date = new Date();
  return (
    <section className="shadow-card md:p-5 p-2.5  border bg-white border-line">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2.5">
          <p className="hidden md:block uppercase md:text-lg text-xs text-zinc-400">
            Task List
          </p>
          <h2 className="md:text-2xl text-md font-bold">Manage your tasks</h2>
          <p className="md:block hidden">
            Add and track tasks in one clean view.
          </p>
        </div>
        <p className="md:text-md text-xs text-zinc-500">
          {date.toLocaleDateString("en-Us", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <TaskForm />
      <TaskList />
      <ClearCompleted />
    </section>
  );
}

export default TaskDashboard;
