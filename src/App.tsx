import { useState } from 'react';
import Nav from './components/nav';
import List from './components/list';
import { useTodoStore } from '@/store/todo';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AddTask from '@/components/drawer/add-task';
import { Toaster } from 'react-hot-toast';
function App() {
  const todos = useTodoStore((state) => state.todos);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <div className="App min-h-screen bg-green-500/2 shadow">
        <div className="w-full bg-green-600 p-0.5"></div>
        <div className="h-[30px] overflow-hidden rounded border-green-500 bg-gray-200 shadow-inner">
          <div className="animate-progress-bar bg-stripes h-full bg-green-600 bg-[length:40px_40px] shadow-inner"></div>
        </div>

        <div className="bg- w-full p-0.5"></div>
        <div className="font-satoshi container mx-auto max-w-5xl p-5 pt-10 md:pt-20">
          {todos.length > 0 ? (
            <>
              <Nav />
              <List />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-5">
              <h2 className="font-satoshi text-2xl font-bold tracking-tighter text-gray-800">
                Tododay.
              </h2>
              <DotLottieReact
                className="mx-auto h-[300px] w-[300px]"
                src="https://lottie.host/c837b5fa-ad8a-42a7-a319-efe0f83cbb57/HdUUiLWxaD.lottie"
                autoplay
              />
              <p className="font-satoshi text-center text-lg font-semibold text-gray-400">
                You haven't added any task today, add a task to get started.
              </p>
              <button
                onClick={handleOpenDrawer}
                className="cursor-pointer rounded-md bg-green-500/20 px-4 py-2 text-lg font-semibold text-green-800"
              >
                Create a new task 🚀
              </button>
            </div>
          )}
          <AddTask isOpen={openDrawer} handleOpen={() => handleOpenDrawer()} />
          <Toaster />
        </div>
      </div>
    </>
  );
}

export default App;
