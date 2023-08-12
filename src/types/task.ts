export interface NewTaskRequest {
  userId: string;
  title: string;
  description: string | null;
  deadline: string | null;
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

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deadline: string | null;
  completedAt: string | null;
  userId: string;
  priority: number;
  isDone: boolean;
}
