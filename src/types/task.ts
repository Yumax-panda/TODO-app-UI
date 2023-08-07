export interface NewTaskRequest {
  userId: string;
  title: string;
  description?: string;
  deadline?: string;
  priority: number;
}

export interface UpdateTaskRequest {
  id: string;
  title?: string;
  description?: string;
  deadline?: string;
  priority?: number;
  isDone?: boolean;
}
