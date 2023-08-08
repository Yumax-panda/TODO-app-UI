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

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  completedAt?: string;
  userId: string;
  priority: number;
  isDone: boolean;
}
