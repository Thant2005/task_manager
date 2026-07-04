import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTask,
  clearCompleted,
  deleteTask,
  getTasks,
  toggleTask,
} from "../services/taskService";
import type { Task } from "../types/task";
type userId = string | undefined;

const useTasks = (userId: userId) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => getTasks("tasks", userId!),
    enabled: !!userId,
  });

  return { data, error, isLoading };
};

const useAddTask = (userId: userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) =>
      addTask("tasks", { title, is_completed: false }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", userId] }),
  });
};
const useToggleTask = (userId: userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      currentStatus,
    }: {
      id: string;
      currentStatus: boolean;
    }) => toggleTask("tasks", id, currentStatus, userId!),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", userId] });
      const prevTesk = queryClient.getQueryData(["tasks", userId]);
      queryClient.setQueryData<Task[]>(
        ["tasks", userId],
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
      queryClient.setQueryData(["tasks", userId], context?.prevTesk);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", userId] });
    },
  });
};
const useDeleteTask = (userId: userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTask("tasks", id, userId!),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", userId] }),
  });
};
const useCompleted = (userId: userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => clearCompleted("tasks", userId!),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", userId] }),
  });
};
export { useTasks, useAddTask, useToggleTask, useDeleteTask, useCompleted };
