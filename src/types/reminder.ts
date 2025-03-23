export interface Reminder {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}
