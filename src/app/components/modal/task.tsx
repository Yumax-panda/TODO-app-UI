import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";

import { NewTaskRequest, Task } from "../../../types/task";
import { _ModalBaseProps } from "./common";

export interface CreateModalProps extends _ModalBaseProps {
  userId: string;
}

export interface EditModalProps extends _ModalBaseProps {
  id: string;
}

export interface EditModalInput {
  title: string;
  description: string;
  deadline: string;
}

export const CreateModal: React.FC<CreateModalProps> = ({ userId, onClose }) => {
  const [request, setRequest] = useState<NewTaskRequest>({
    userId: userId,
    title: "",
    description: "",
    deadline: "",
    priority: 0,
  });

  async function createTask({ request }: { request: NewTaskRequest }) {
    return await axios.post<Task>("/api/tasks/create", request).then((res) => res.data);
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
          <FontAwesomeIcon
            icon={faX}
            className='w-3.5 h-3.5'
            width='8'
            height='8'
            viewBox='0 0 8 8'
            fill='none'
          />
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
              setRequest({ ...request, deadline: e.target.value });
            }}
          />
        </div>

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

        <div className='grid'>
          <button
            type='submit'
            className='py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 sm:p-4'
            onSubmit={(e) => {
              e.preventDefault();
              createTask({ request });
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
