import { faTriangleExclamation, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";

import { NewTaskRequest, Task } from "../../../types/task";
import { _ModalBaseProps } from "./common";

interface RefreshRequiredModalProps extends _ModalBaseProps {
  refresh: () => Promise<void>;
}

export interface CreateModalProps extends RefreshRequiredModalProps {
  userId: string;
}

export interface TaskRelatedModalProps extends RefreshRequiredModalProps {
  task: Task;
}

export interface EditModalInput {
  title: string | null;
  description: string | null;
  deadline: string | null;
  priority: number;
}

export const CreateModal: React.FC<CreateModalProps> = ({ userId, onClose, refresh }) => {
  const [request, setRequest] = useState<NewTaskRequest>({
    userId: userId,
    title: "",
    description: null,
    deadline: null,
    priority: 100,
  });

  async function createTask({ request }: { request: NewTaskRequest }) {
    const actual: any = {
      userId: userId,
      title: request.title,
      description: request.description,
      priority: request.priority,
    };

    return await axios.post<Task>("/api/task/create", actual).then((res) => res.data);
  }

  return (
    <>
      <div className='flex justify-between items-center py-3 px-4 border-b dark:border-grey-700'>
        <h3 className='font-bold text-grey-800 dark:text-grey-200'>タスクを作成</h3>
        <button
          type='button'
          onClick={onClose}
          className='inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800'
          data-hs-overlay='#hs-bg-gray-on-hover-cards'
        >
          <span className='sr-only'>閉じる</span>
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>

      <form>
        <div className='mb-4'>
          <label className='block text-sm font-medium dark:text-white'>
            <span className='sr-only'>タイトル</span>
          </label>
          <input
            type='text'
            className='w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
            placeholder='タイトル'
            onChange={(e) => {
              e.preventDefault();
              setRequest({ ...request, title: e.target.value });
            }}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium dark:text-white'>
            <span className='sr-only'>説明</span>
          </label>
          <input
            type='text'
            className='w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
            placeholder='説明'
            onChange={(e) => {
              e.preventDefault();
              setRequest({ ...request, description: e.target.value });
            }}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium dark:text-white'>
            <span className='sr-only'>期限</span>
          </label>
          <input
            type='datetime-local'
            className='w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
            placeholder='期限'
            onChange={(e) => {
              e.preventDefault();
              const datetime = new Date(e.target.value);
              setRequest({ ...request, deadline: datetime.toISOString() });
            }}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium dark:text-white'>
            <span className='sr-only'>優先度</span>
          </label>
          <select
            className='py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
            placeholder='期限'
            onChange={(e) => {
              e.preventDefault();
              const priority = e.target.value in ["0", "1", "2"] ? parseInt(e.target.value) : 100;
              setRequest({ ...request, priority });
            }}
          >
            <option value='100'>優先度</option>
            <option value='0'>低</option>
            <option value='1'>中</option>
            <option value='2'>高</option>
          </select>
        </div>

        <div className='grid'>
          <button
            type='button'
            className='py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 sm:p-4'
            onClick={async (e) => {
              e.preventDefault();
              const missing: string[] = [];
              if (!request.title) missing.push("タイトル");
              if (request.priority === 100) missing.push("優先度");
              if (missing.length > 0) return alert(`「${missing.join(", ")}」が入力されていません`);
              await createTask({ request });
              await refresh();
              onClose();
            }}
          >
            追加
          </button>
        </div>
      </form>
    </>
  );
};

export const EditModal: React.FC<TaskRelatedModalProps> = ({ task, onClose, refresh }) => {
  const [request, setRequest] = useState<EditModalInput>({
    title: task.title,
    description: task.description,
    deadline: null,
    priority: task.priority,
  });

  async function editTask({ request }: { request: EditModalInput }): Promise<Task> {
    return await axios
      .post<Task>("/api/task/update", { id: task.id, ...request })
      .then((res) => res.data);
  }

  return (
    <>
      <div className='flex justify-between items-center my-4 px-4 border-b dark:border-grey-700'>
        <h3 className='font-bold text-grey-800 dark:text-grey-200'>タスクを編集</h3>
        <button
          type='button'
          onClick={onClose}
          className='inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800'
          data-hs-overlay='#hs-bg-gray-on-hover-cards'
        >
          <span className='sr-only'>閉じる</span>
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>

      <form>
        <div className='mb-4'>
          <label className='block text-sm font-medium dark:text-white'>
            <span className='sr-only'>タイトル</span>
          </label>
          <input
            type='text'
            className='w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
            placeholder='タイトル'
            defaultValue={task.title}
            onChange={(e) => {
              e.preventDefault();
              setRequest({ ...request, title: e.target.value });
            }}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium dark:text-white'>
            <span className='sr-only'>説明</span>
          </label>
          <input
            type='text'
            className='w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
            placeholder='説明'
            defaultValue={task.description}
            onChange={(e) => {
              e.preventDefault();
              setRequest({ ...request, description: e.target.value });
            }}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium dark:text-white'>
            <span className='sr-only'>期限</span>
          </label>
          <input
            type='datetime-local'
            className='w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
            placeholder='期限'
            onChange={(e) => {
              e.preventDefault();
              const datetime = new Date(e.target.value);
              setRequest({ ...request, deadline: datetime.toISOString() });
            }}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium dark:text-white'>
            <span className='sr-only'>優先度</span>
          </label>
          <select
            className='py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
            placeholder='期限'
            onChange={(e) => {
              e.preventDefault();
              const priority =
                e.target.value in ["0", "1", "2"] ? parseInt(e.target.value) : task.priority;
              setRequest({ ...request, priority });
            }}
            required={false}
            defaultValue={task.priority}
          >
            <option value='100'>優先度</option>
            <option value='0'>低</option>
            <option value='1'>中</option>
            <option value='2'>高</option>
          </select>
        </div>

        <div className='grid'>
          <button
            type='button'
            className='py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 sm:p-4'
            onClick={async (e) => {
              e.preventDefault();
              if (!request.title) return alert("タイトルを入力してください。");
              await editTask({ request });
              await refresh();
              onClose();
            }}
          >
            変更を保存
          </button>
        </div>
      </form>
    </>
  );
};

export const DeleteModal: React.FC<TaskRelatedModalProps> = ({ task, onClose, refresh }) => {
  async function deleteTask(): Promise<Task> {
    return await axios.post<Task>("/api/task/delete", { id: task.id }).then((res) => res.data);
  }

  return (
    <div>
      {/* Head */}
      <div className='grid grid-rows-3 grid-flow-col gap-x-4 border-b'>
        <div className='row-span-1 col-span-3 mb-2 flex justify-between items-center border-b pr-2'>
          <h2 className='font-bold text-gray-800 dark:text-gray-200 pb-3 content-between flex'>
            「{task.title}」を削除
          </h2>
          <FontAwesomeIcon
            icon={faX}
            className='inline-flex flex-shrink-0 justify-center items-center rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800'
            size='lg'
            onClick={onClose}
          />
        </div>
        <div className='row-span-2 col-span-1 content-center my-auto mx-auto'>
          <FontAwesomeIcon icon={faTriangleExclamation} size='2x' color='#F6AA00' />
        </div>
        <div className='row-span-2 col-span-2'>
          <p className='text-gray-500 pt-4'>
            一度削除したら元に戻せません。
            <br />
            本当に削除しますか?
          </p>
        </div>
      </div>
      {/* End Head */}

      {/* Buttons */}
      <div className='grid grid-cols-4 gap-2 mt-4 mx-auto text-center'>
        <div className='col-span-1'></div>
        <div
          className='col-span-1 cursor-pointer border-2 border-gray-200 rounded-md text-gray-500 text-base py-1'
          onClick={onClose}
        >
          キャンセル
        </div>
        <div
          className='col-span-1 bg-red-600 text-white rounded-md cursor-pointer border-2 border-gray-200 text-base py-1'
          onClick={async (e) => {
            e.preventDefault();
            await deleteTask();
            await refresh();
            onClose();
          }}
        >
          削除
        </div>
        <div className='col-span-1'></div>
      </div>
      {/* End Buttons */}
    </div>
  );
};
