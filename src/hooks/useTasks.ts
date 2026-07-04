import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTask,
  clearCompleted,
  deleteTask,
  getTasks,
  toggleTask,
} from "../services/taskService";
import type { Task } from "../types/task";

const useTasks = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks("tasks"),
  });

  return { data, error, isLoading };
};

const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) =>
      addTask("tasks", { title, is_completed: false }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};
const useToggleTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      currentStatus,
    }: {
      id: string;
      currentStatus: boolean;
    }) => toggleTask("tasks", id, currentStatus),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const prevTesk = queryClient.getQueryData(["tasks"]);
      queryClient.setQueryData<Task[]>(
        ["tasks"],
        (old) =>
          old?.map((task) =>
            task.id === newTask.id
              ? { ...task, is_completed: newTask.currentStatus }
              : task,
          ) ?? [],
      );
      return { prevTesk };
    },
    onError: (_err, _newTask, context) => {
      queryClient.setQueryData(["tasks"], context?.prevTesk);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTask("tasks", id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};
const useCompleted = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => clearCompleted("tasks"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};
export { useTasks, useAddTask, useToggleTask, useDeleteTask, useCompleted };
