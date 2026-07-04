import { supabase } from "../lib/supabaseClient";
import type { Task } from "../types/task";

const getTasks = async (table: string, user_id: string): Promise<Task[]> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
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
  return data;
};

const toggleTask = async (
  table: string,
  id: string,
  currentStatus: boolean,
  userId: string,
): Promise<Task> => {
  const { data, error } = await supabase
    .from(table)
    .update({ is_completed: currentStatus })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const deleteTask = async (table: string, id: string, userId: string) => {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
};
const clearCompleted = async (table: string, userId: string) => {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq("user_id", userId)
    .eq("is_completed", true);
  if (error) throw new Error(error.message);
};
export { getTasks, addTask, toggleTask, deleteTask, clearCompleted };
