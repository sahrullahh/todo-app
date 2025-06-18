import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

import { useTodoStore } from '@/store/todo';

export default function addTask({
  isOpen,
  handleOpen,
}: {
  isOpen: boolean;
  handleOpen: () => void;
}) {
  const [data, setData] = useState({
    id: '',
    title: '',
    steps: [],
    completed: false,
    createdAt: new Date(),
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const [charCount, setCharCount] = useState(50);
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharCount(Math.max(0, 50 - e.target.value.length));
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleAddTodo = () => {
    if (data.title === '' || data.title.trim() === '') return;
    setCharCount(50);
    const todo = { ...data, id: uuidv4() };
    addTodo(todo);
    handleOpen();
    setData({
      id: '',
      title: '',
      steps: [],
      completed: false,
      createdAt: new Date(),
    });
  };

  return (
    <>
      <Drawer open={isOpen} onOpenChange={handleOpen}>
        <DrawerTitle className="sr-only">Add Task</DrawerTitle>
        <DrawerContent className="font-satoshi">
          <DrawerHeader className="container mx-auto max-w-xl">
            <input
              name="titleTodo"
              id="titleTodo"
              ref={inputRef}
              type="text"
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
                handleChangeCount(e);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTodo();
              }}
              maxLength={50}
              className={`p-3 focus:ring-2 ${
                charCount === 0 ? 'ring-red-500/20' : 'focus:ring-green-500/20'
              } w-full rounded-md border border-gray-300 focus:outline-none`}
              placeholder="Write your title task here"
              required
            />
            <div className="flex justify-between">
              <p className="pt-2 text-sm text-gray-500">
                Add a title to your task. You can add more details later.
              </p>
              <p className="pt-2 text-sm text-gray-500">{charCount}</p>
            </div>
          </DrawerHeader>
          <DrawerFooter className="container mx-auto max-w-xl">
            <button
              onClick={handleAddTodo}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-green-600 px-5 py-2 font-semibold text-white"
            >
              Add Task
            </button>
            <button
              onClick={handleOpen}
              className="flex items-center justify-center gap-2 rounded-md border bg-gray-100/10 px-5 py-2 font-semibold text-gray-400"
            >
              Cancel
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
