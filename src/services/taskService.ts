import { supabase } from "../lib/supabaseClient";
import type { Task } from "../types/task";

const getTasks = async (table: string): Promise<Task[]> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")

    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
};

const addTask = async (
  table: string,
  payload: Pick<Task, "title" | "is_completed">,
): Promise<Task> => {
  const { data, error } = await supabase
    .from(table)
    .insert(payload)
    .select()
    .single();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Failed to add task:No data return");
  return data;
};

const toggleTask = async (
  table: string,
  id: string,
  currentStatus: boolean,
): Promise<Task> => {
  const { data, error } = await supabase
    .from(table)
    .update({ is_completed: currentStatus })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Failed to updated task:No data return");
  return data;
};

const deleteTask = async (table: string, id: string) => {
  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) throw new Error(error.message);
};
const clearCompleted = async (table: string) => {
  const { error } = await supabase
    .from(table)
    .delete()

    .eq("is_completed", true);
  if (error) throw new Error(error.message);
};
export { getTasks, addTask, toggleTask, deleteTask, clearCompleted };
