import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt: string;
  deadline?: string;
  completedAt?: string;
  userId: string;
  priority: number;
  isDone: boolean;
}

const Dashboard = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id as string;
  const [tasks, setTasks] = useState<Task[]>([]);
  const fetchTask = async (userId: string): Promise<Task[]> => {
    return await axios.get<Task[]>(`/api/task?userId=${userId}`).then((res) => res.data);
  };

  useEffect(() => {
    (async () => {
      const newTasks = await fetchTask(userId);
      setTasks(newTasks);
    })();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>{JSON.stringify(session)}</div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
