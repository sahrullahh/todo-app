import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useTodoStore } from '@/store/todo';
import ExtraTodo from '@/components/sheet/extra-todo';
import toast from 'react-hot-toast';

export default function Card({
  title,
  id,
  completed,
}: {
  title: string;
  id: string;
  completed: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [sheetOpen, setSheetOpen] = useState(false);

  const todos = useTodoStore((state) => state.todos);
  const steps = todos.find((todo) => todo.id === id)?.steps || [];

  const setStepCompletedCount = useTodoStore((state) => state.setStepCompletedCount);

  const setCompletedCount = useTodoStore((state) => state.setCompletedCount);
  const editTodo = useTodoStore((state) => state.editTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const stepCompletedCount = useTodoStore((state) => state.stepCompletedCount);

  const handleSave = (id: string, title: string) => {
    setIsEditing(false);
    editTodo(id, title, completed);
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!steps.length) {
      editTodo(id, editedTitle, e.target.checked);
    } else {
      toast.error('You cannot mark this to-do as completed because it has steps.');
    }
  };

  const handleOpenSheet = () => {
    setSheetOpen(!sheetOpen);
  };
  const handleDelete = (id: string) => {
    removeTodo(id);
  };

  useEffect(() => {
    setCompletedCount(todos.filter((todo) => todo.completed).length);
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const count = steps.filter((step) => step.completed).length;
    setStepCompletedCount(id, count);
  }, [steps, id]);

  useEffect(() => {
    if (steps.length) {
      const isCompleted = stepCompletedCount[id] === steps.length;
      editTodo(id, title, isCompleted);
    }
  }, [stepCompletedCount, steps.length, id, title]);

  return (
    <div className="group flex w-full items-center gap-4 rounded-md bg-white p-2 shadow transition-all hover:border-r-8 hover:border-green-600 hover:bg-green-100/20">
      <label
        htmlFor={`todo-${id}`}
        className={`flex gap-4 ${
          isEditing ? 'w-full' : 'w-auto flex-shrink-0'
        } cursor-pointer items-center rounded-md p-2`}
      >
        <input
          type="checkbox"
          id={`todo-${id}`}
          className="peer h-5 w-5 rounded-md border-gray-300 accent-green-500"
          hidden
          checked={completed}
          onChange={handleToggle}
        />
        <Icon
          icon="mingcute:check-circle-fill"
          className="hidden text-2xl text-green-600 peer-checked:block"
        />
        <Icon
          icon="mingcute:round-line"
          className="block text-2xl text-gray-300 peer-checked:hidden"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={() => handleSave(id, editedTitle)}
            maxLength={50}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave(id, editedTitle);
            }}
            autoFocus
            className="w-full border-b border-green-600 bg-transparent font-semibold text-gray-700 outline-none"
          />
        ) : (
          <>
            <span className="peer-checked:line-through">
              <p className="user-select-none font-semibold text-gray-500">{editedTitle}</p>
              <p className={`text-sm text-gray-500 ${steps.length > 0 ? 'block' : 'hidden'}`}>
                Step {stepCompletedCount[id]} of {steps.length}
              </p>
            </span>
          </>
        )}
      </label>
      <div
        onClick={() => handleOpenSheet()}
        className={`w-full cursor-pointer ${isEditing ? 'hidden' : 'block'}`}
      ></div>
      <div className={`hidden items-center gap-2 pr-3 group-hover:flex`}>
        <button
          onClick={() => handleOpenSheet()}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-500/10 px-2 py-2 font-bold text-green-600"
        >
          <Icon icon="majesticons:note-text-plus-line" />
        </button>
        <button
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-500/10 px-2 py-2 font-bold text-green-600"
          onClick={() => setIsEditing(true)}
        >
          <Icon icon="material-symbols:edit" />
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-500/10 px-2 py-2 font-bold text-green-600"
        >
          <Icon icon="material-symbols:delete" />
        </button>
      </div>
      <ExtraTodo
        isOpen={sheetOpen}
        handleOpenSheet={() => setSheetOpen(!sheetOpen)}
        data={todos.find((todo) => todo.id === id)!}
      />
    </div>
  );
}
