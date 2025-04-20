import { useState } from 'react';
import Card from '@/components/card';
import { Icon } from '@iconify/react';
import { useTodoStore } from '@/store/todo';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export default function index() {
  const todos = useTodoStore((state) => state.todos);
  const completedCount = useTodoStore((state) => state.completedCount);
  const [tabs, setTabs] = useState('recent');
  const filteredTodos =
    tabs === 'recent' ? todos : tabs === 'completed' ? todos.filter((todo) => todo.completed) : [];

  return (
    <>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex items-center justify-start gap-4 pb-5">
          <button
            onClick={() => setTabs('recent')}
            className={`flex items-center gap-2 rounded-md px-3 py-2 font-semibold transition-all ${tabs === 'recent' ? 'bg-green-600 text-white' : 'bg-green-500/5 text-green-600'}`}
          >
            Recently
            <Icon icon="mdi:recent" className="text-2xl" />
          </button>
          {/* <button
            onClick={() => setTabs('tomorrow')}
            className={`flex items-center gap-2 rounded-md px-3 py-2 font-semibold transition-all ${tabs === 'tomorrow' ? 'bg-green-600 text-white' : 'bg-green-500/5 text-green-600'}`}
          >
            Tomorrow <Icon icon="svg-spinners:clock" className="text-xl" />
          </button>
          <button
            onClick={() => setTabs('last-week')}
            className={`flex items-center gap-2 rounded-md px-3 py-2 font-semibold transition-all ${tabs === 'last-wwe' ? 'bg-green-600 text-white' : 'bg-green-500/5 text-green-600'}`}
          >
            Last week <Icon icon="ep:calendar" className="text-xl" />
          </button> */}
          <button
            onClick={() => setTabs('completed')}
            className={`flex items-center gap-2 rounded-md px-3 py-2 font-semibold transition-all ${tabs === 'completed' ? 'bg-green-600 text-white' : 'bg-green-500/5 text-green-600'}`}
          >
            Completed <Icon icon="iconamoon:check" className="text-2xl" />
          </button>
        </div>
        <div>
          <p className="text-gray-500">
            Task completed {completedCount} of {todos.length}
          </p>
        </div>
      </div>

      <div className="mt-5 flex w-full flex-col gap-4">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => <Card key={todo.id} {...todo} />)
        ) : (
          <div className="flex flex-col items-center justify-center rounded-md bg-white p-5 text-gray-500">
            <DotLottieReact
              className="mx-auto h-[250px] w-[250px]"
              src="https://lottie.host/26438ef2-06d0-480f-81a4-0210a72e1a21/msWuhdDnXW.lottie"
              autoplay
              loop
            />
            <p className="text-lg font-semibold">No tasks completed!, let's it done</p>
          </div>
        )}
      </div>
    </>
  );
}
