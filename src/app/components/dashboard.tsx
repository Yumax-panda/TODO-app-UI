import {
  faBackward,
  faCheck,
  faForward,
  faPenToSquare,
  faPlus,
  faShuffle,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Task } from "../../types/task";
import { ModalWrapper, useModal } from "./modal/common";
import { CreateModal, DeleteModal, EditModal } from "./modal/task";

type SortBy = "deadline" | "priority" | "updatedAt" | "createdAt";
interface TaskPayload {
  data: Task[];
  total: number;
}
interface Params {
  sortBy: SortBy;
  pageSize: number;
  page: number;
}

const Dashboard = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id as string;
  const [payload, setPayload] = useState<TaskPayload>({ data: [], total: 0 });
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [params, setParams] = useState<Params>({
    sortBy: "deadline",
    pageSize: 5,
    page: 1,
  });
  const { modalState, openModal, closeModal } = useModal();
  const fetchTask = async (
    sortBy: SortBy = params.sortBy,
    page: number = params.page,
    pageSize: number = params.pageSize,
  ): Promise<TaskPayload> => {
    const skip = (page - 1) * pageSize;
    return await axios
      .get<TaskPayload>(
        `/api/task?userId=${userId}&sortBy=${sortBy}&skip=${skip}&pageSize=${pageSize}`,
      )
      .then((res) => res.data);
  };
  const formatDate = (date: string) => {
    return dayjs(date).format("YYYY/MM/DD");
  };
  const isNearDeadline = (date: string | null) => {
    if (date === null) return false;
    const now = dayjs();
    const deadline = dayjs(date);
    const diff = deadline.diff(now, "day");
    return diff <= 2;
  };

  useEffect(() => {
    (async () => {
      const payload = await fetchTask();
      setPayload(payload);
    })();
  }, []);

  const updateTask = async (data: any): Promise<Task> => {
    return await axios.post<Task>("/api/task/update", data).then((response) => {
      return response.data;
    });
  };

  const refresh = async (
    sortBy: SortBy = params.sortBy,
    page: number = params.page,
    pageSize: number = params.pageSize,
  ): Promise<void> => {
    const payload = await fetchTask(sortBy, page, pageSize);
    setPayload(payload);
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

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='inline-flex gap-x-2 border-2 pr-2 pl-1 rounded-md'>
                      <label htmlFor='sort' className='my-auto'>
                        <FontAwesomeIcon icon={faShuffle} />
                      </label>
                      <select
                        id='sort'
                        className='py-3 px-4 pr-9 block w-full rounded-md text-sm dark:text-gray-400 outline-none'
                        onChange={async (e) => {
                          const query = e.target.value as SortBy;
                          await refresh(query);
                          setParams({ ...params, sortBy: query });
                        }}
                      >
                        <option value='deadline'>期限</option>
                        <option value='priority'>優先度</option>
                        <option value='updatedAt'>更新日</option>
                        <option value='createdAt'>作成日</option>
                      </select>
                    </div>

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
                            期限
                          </span>
                        </div>
                      </th>

                      <th scope='col' className='px-6 py-3 text-left'></th>
                    </tr>
                  </thead>

                  <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                    {payload.data.map((task) => {
                      return (
                        <tr key={task.id}>
                          <td className='h-px w-px whitespace-nowrap'>
                            <div className='pl-6 py-3'>
                              <span className='text-sm text-gray-500'>{task.title}</span>
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
                              onClick={async (e) => {
                                e.preventDefault();
                                await updateTask({ id: task.id, isDone: !task.isDone });
                                await refresh();
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
                              <span
                                className={
                                  isNearDeadline(task.deadline)
                                    ? "text-sm text-red-500"
                                    : "text-sm text-gray-500"
                                }
                              >
                                {task.deadline ? formatDate(task.deadline) : null}
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
                        {`${5 * (params.page - 1) + 1}-${Math.min(5 * params.page, payload.total)}`}
                      </span>{" "}
                      /{payload.total}件
                    </p>
                  </div>

                  <div>
                    <div className='inline-flex gap-x-2'>
                      <button
                        type='button'
                        className='py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800'
                        disabled={params.page === 1}
                        onClick={async (e) => {
                          e.preventDefault();
                          await refresh(params.sortBy, params.page - 1, params.pageSize);
                          setParams({ ...params, page: params.page - 1 });
                        }}
                      >
                        <FontAwesomeIcon icon={faBackward} style={{ color: "grey" }} />
                        Prev
                      </button>

                      <button
                        type='button'
                        className='py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800'
                        disabled={params.page === Math.ceil(payload.total / params.pageSize)}
                        onClick={async (e) => {
                          e.preventDefault();
                          await refresh(params.sortBy, params.page + 1, params.pageSize);
                          setParams({ ...params, page: params.page + 1 });
                        }}
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
                    <CreateModal userId={userId} onClose={closeModal} refresh={refresh} />
                  </ModalWrapper>
                ) : modalState === "edit" && currentTask !== null ? (
                  <ModalWrapper onClose={closeModal}>
                    <EditModal task={currentTask} onClose={closeModal} refresh={refresh} />
                  </ModalWrapper>
                ) : modalState === "delete" && currentTask !== null ? (
                  <ModalWrapper onClose={closeModal}>
                    <DeleteModal task={currentTask} onClose={closeModal} refresh={refresh} />
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
