import {
  faBackward,
  faCheck,
  faForward,
  faPenToSquare,
  faPlus,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Task } from "../../types/task";
import { ModalWrapper, useModal } from "./modal/common";
import { CreateModal, DeleteModal, EditModal } from "./modal/task";

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id as string;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const { modalState, openModal, closeModal } = useModal();
  const fetchTask = async (userId: string): Promise<Task[]> => {
    return await axios.get<Task[]>(`/api/task?userId=${userId}`).then((res) => res.data);
  };
  const formatDate = (date: string) => {
    const _date = date.slice(0, 10).replace(/-/g, "/");
    const _time = date.slice(11, 16);

    return `${_date} ${_time}`;
  };

  useEffect(() => {
    (async () => {
      const newTasks = await fetchTask(userId);
      setTasks(newTasks);
    })();
  }, []);

  const updateTask = async (data: any): Promise<Task> => {
    return await axios.post<Task>("/api/task/update", data).then((response) => {
      return response.data;
    });
  };

  return (
    <>
      {/* Table Section */}
      <div className='max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        {/* Card */}
        <div className='flex flex-col'>
          <div className='-m-1.5 overflow-x-auto'>
            <div className='p-1.5 min-w-full inline-block align-middle'>
              <div className='bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700'>
                {/* Header */}
                <div className='px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700'>
                  <div>
                    <h2 className='text-xl font-semibold text-grey-800 dark:text-grey-200'>
                      Dashboard
                    </h2>
                  </div>

                  <div>
                    <div className='inline-flex gap-x-2'>
                      <div
                        className='py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
                        onClick={(e) => {
                          openModal("create");
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
                        タスクを追加
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Header */}

                {/* Table */}

                <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                  <thead className='bg-gray-50 dark:bg-gray-800'>
                    <tr>
                      <th scope='col' className='pl-6 lg:pl-3 xl:pl-5 pr-6 py-3 text-left'>
                        <div className='flex items-center gap-x-2'>
                          <span className='text-xs font-semibold  text-gray-800 dark:text-gray-200 min-w-max'>
                            タイトル
                          </span>
                        </div>
                      </th>

                      <th scope='col' className='px-6 py-3 text-left'>
                        <div className='flex items-center gap-x-2'>
                          <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 min-w-max'>
                            説明
                          </span>
                        </div>
                      </th>

                      <th scope='col' className='px-6 py-3 text-left'>
                        <div className='flex items-center gap-x-2'>
                          <span className='text-xs font-semibold text-gray-800 dark:text-gray-200 min-w-max'>
                            完了
                          </span>
                        </div>
                      </th>

                      <th scope='col' className='px-6 py-3 text-left'>
                        <div className='flex items-center gap-x-2'>
                          <span className='text-xs font-semibold tracking-wide text-gray-800 dark:text-gray-200 min-w-max'>
                            最終更新日
                          </span>
                        </div>
                      </th>

                      <th scope='col' className='px-6 py-3 text-left'></th>
                    </tr>
                  </thead>

                  <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                    {tasks.map((task) => {
                      return (
                        <tr key={task.id}>
                          <td className='h-px w-px whitespace-nowrap'>
                            <div className='pl-6 py-3'>
                              <span className='text-sm text-grey-500'>{task.title}</span>
                            </div>
                          </td>

                          <td className='h-px w-px whitespace-nowrap'>
                            <div className='pl-6 py-3'>
                              <span className='text-sm text-grey-500'>{task.description}</span>
                            </div>
                          </td>

                          <td className='h-px w-px whitespace-nowrap'>
                            <div
                              className='pl-6 py-3 hover:cursor-pointer'
                              onClick={(e) => {
                                e.preventDefault();
                                updateTask({ id: task.id, isDone: !task.isDone });
                                router.refresh();
                              }}
                            >
                              {task.isDone ? (
                                <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                              ) : (
                                <FontAwesomeIcon icon={faX} style={{ color: "red" }} />
                              )}
                            </div>
                          </td>

                          <td className='h-px w-px whitespace-nowrap'>
                            <div className='pl-6 py-3'>
                              <span className='text-sm text-grey-500'>
                                {formatDate(task.updatedAt)}
                              </span>
                            </div>
                          </td>

                          <td className='h-px w-px whitespace-nowrap'>
                            <div className='pl-6 py-3 text-lg'>
                              <button
                                className='pr-4'
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentTask(task);
                                  openModal("edit");
                                }}
                              >
                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "blue" }} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentTask(task);
                                  openModal("delete");
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* End Table */}

                {/* Footer */}
                <div className='px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700'>
                  <div>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      <span className='font-semibold text-gray-800 dark:text-gray-200'>
                        {tasks.length}
                      </span>{" "}
                      件
                    </p>
                  </div>

                  <div>
                    <div className='inline-flex gap-x-2'>
                      <button
                        type='button'
                        className='py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800'
                      >
                        <FontAwesomeIcon icon={faBackward} style={{ color: "grey" }} />
                        Prev
                      </button>

                      <button
                        type='button'
                        className='py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800'
                      >
                        Next
                        <FontAwesomeIcon icon={faForward} style={{ color: "grey" }} />
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Footer */}

                {modalState === "create" ? (
                  <ModalWrapper onClose={closeModal}>
                    <CreateModal userId={userId} onClose={closeModal} />
                  </ModalWrapper>
                ) : modalState === "edit" && currentTask !== null ? (
                  <ModalWrapper onClose={closeModal}>
                    <EditModal task={currentTask} onClose={closeModal} />
                  </ModalWrapper>
                ) : modalState === "delete" && currentTask !== null ? (
                  <ModalWrapper onClose={closeModal}>
                    <DeleteModal task={currentTask} onClose={closeModal} />
                  </ModalWrapper>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
      {/* End Table Section */}
    </>
  );
};

export default Dashboard;
