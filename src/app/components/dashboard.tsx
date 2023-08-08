import { faCheck, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
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
    <>
      <nav className='relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'></nav>

      <div className='flex flex-col'>
        <div className='-m-1.5 overflow-x-auto'>
          <div className='p-1.5 min-w-full inline-block align-middle'>
            <div className='overflow-hidden'>
              <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                <thead>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                      完了
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                      タイトル
                    </th>
                    <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase'>
                      編集
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                  {tasks.map((task) => {
                    return (
                      <tr id={task.id} key={task.id}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                          {task.isDone ? <FontAwesomeIcon icon={faCheck} /> : <div></div>}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 font-bold'>
                          {task.title}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                          <FontAwesomeIcon icon={faPenToSquare} style={{ color: "blue" }} />
                          <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
