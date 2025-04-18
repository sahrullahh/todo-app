import { useState } from "react";
import Nav from "./components/nav";
import List from "./components/list";
import { useTodoStore } from "@/store/todo";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AddTask from "@/components/drawer/add-task";
import { Toaster } from 'react-hot-toast';
function App() {
  const todos = useTodoStore((state) => state.todos);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>

        <div className="App bg-green-500/2 min-h-screen shadow">
          <div className="bg-green-600  w-full p-0.5"></div>
          <div className=" border-green-500 h-[30px] rounded shadow-inner overflow-hidden bg-gray-200">
            <div className="h-full bg-green-600 shadow-inner animate-progress-bar bg-stripes bg-[length:40px_40px]"></div>
          </div>

          <div className="bg- w-full p-0.5"></div>
          <div className="container max-w-5xl mx-auto md:pt-20 pt-10 font-satoshi p-5">
            {todos.length > 0 ? (
              <>
                <Nav />
                <List />
              </>
            ) : (
              <div className="flex flex-col justify-center items-center gap-5">
                <h2 className="font-bold text-2xl tracking-tighter font-satoshi text-gray-800">
                  Tododay.
                </h2>
                <DotLottieReact
                  className="mx-auto w-[300px] h-[300px]"
                  src="https://lottie.host/c837b5fa-ad8a-42a7-a319-efe0f83cbb57/HdUUiLWxaD.lottie"
                  autoplay
                />
                <p className="text-lg font-semibold font-satoshi text-gray-400 text-center">
                  You haven't added any task today, add a task to get started.
                </p>
                <button
                  onClick={handleOpenDrawer}
                  className="cursor-pointer bg-green-500/20 text-green-800 py-2 px-4 rounded-md  font-semibold text-lg"
                >
                  Create a new task 🚀
                </button>
              </div>
            )}
            <AddTask
              isOpen={openDrawer}
              handleOpen={() => handleOpenDrawer()}
            />
             <Toaster />
          </div>
        </div>
    
    </>
  );
}

export default App;
