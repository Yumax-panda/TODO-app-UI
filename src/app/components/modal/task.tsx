import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { NewTaskRequest, Task } from "../../../types/task";
import { _ModalBaseProps } from "./common";

export interface CreateModalProps extends _ModalBaseProps {
  userId: string;
}

export interface EditModalProps extends _ModalBaseProps {
  task: Task;
}

export interface EditModalInput {
  title: string | null;
  description: string | null;
  deadline: string | null;
  priority: number | null;
}

export const CreateModal: React.FC<CreateModalProps> = ({ userId, onClose }) => {
  const [request, setRequest] = useState<NewTaskRequest>({
    userId: userId,
    title: "",
    description: "",
    deadline: "",
    priority: 0,
  });
  const router = useRouter();

  async function createTask({ request }: { request: NewTaskRequest }) {
    const actual: any = {
      userId: userId,
      title: request.title,
      description: request.description,
      priority: request.priority,
    };

    if (!request.title) {
      alert("タイトルを入力してください");
      return null;
    }
    if (request.deadline) {
      actual.deadline = request.deadline;
    }
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

        <div className='grid'>
          <button
            type='button'
            className='py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 sm:p-4'
            onClick={async (e) => {
              e.preventDefault();
              const newTask = await createTask({ request });
              if (newTask) router.refresh();
            }}
          >
            追加
          </button>
        </div>
      </form>
    </>
  );
};

export const EditModal: React.FC<EditModalProps> = ({ task, onClose }) => {
  const router = useRouter();
  const [request, setRequest] = useState<EditModalInput>({
    title: null,
    description: null,
    deadline: null,
    priority: null,
  });

  async function editTask({ request }: { request: EditModalInput }): Promise<Task> {
    const actual: any = { id: task.id };
    if (request.title) actual.title = request.title;
    if (request.description) actual.description = request.description;
    if (request.deadline) actual.deadline = request.deadline;
    if (request.priority) actual.priority = request.priority;
    alert(JSON.stringify(actual));
    return await axios.post<Task>("/api/task/update", actual).then((res) => res.data);
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
              setRequest({ ...request, priority: parseInt(e.target.value) });
            }}
            required={false}
            defaultValue={task.priority}
          >
            <option value={0}>低</option>
            <option value={1}>中</option>
            <option value={2}>高</option>
          </select>
        </div>

        <div className='grid'>
          <button
            type='button'
            className='py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 sm:p-4'
            onClick={async (e) => {
              e.preventDefault();
              const newTask = await editTask({ request });
              if (newTask) router.refresh();
            }}
          >
            変更を保存
          </button>
        </div>
      </form>
    </>
  );
};
