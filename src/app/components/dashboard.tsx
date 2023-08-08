import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { Task } from "../../types/task";

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
      <table className='table-fixed'>
        <thead>
          <tr>
            <th>完了済</th>
            <th>タイトル</th>
            <th>編集</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr id={task.id} key={task.id}>
                <td>{task.isDone ? "完了" : "未完了"}</td>
                <td>{task.title}</td>
                <td>
                  <FontAwesomeIcon icon={faCoffee} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
