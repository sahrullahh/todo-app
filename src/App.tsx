import Nav from "./components/nav";
import Card from "./components/card";
import { Icon } from "@iconify/react";
import { useTodoStore } from "./store/todo";
function App() {
  const todos = useTodoStore((state) => state.todos);
  const completedCount = useTodoStore((state) => state.completedCount);

  return (
    <>
      <div className="App bg-green-500/2 min-h-screen shadow">
        <div className="bg-green-600  w-full p-0.5"></div>
        <div className=" border-green-500 h-[30px] rounded shadow-inner overflow-hidden bg-gray-200">
          <div className="h-full bg-green-600 shadow-inner animate-progress-bar bg-stripes bg-[length:40px_40px]"></div>
        </div>
        <div className="bg-green-600  w-full p-0.5"></div>
        <div className="container max-w-5xl mx-auto md:pt-20 pt-10 font-satoshi p-5">
          <Nav />
          <div className="flex md:flex-row flex-col justify-between items-center">
            <div className="flex gap-4 justify-start items-center pb-5">
              <button className="flex items-center gap-2 px-3 py-2 rounded-md font-semibold text-white bg-green-600">
                Recently Added{" "}
                <Icon
                  icon="material-symbols-light:note-stack-add"
                  className="text-2xl"
                />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-md font-semibold text-green-600 bg-green-500/5">
                Completed{" "}
                <Icon
                  icon="iconamoon:check"
                  className="text-2xl"
                />
              </button>
            </div>
            <div>
              <p className="text-gray-500">
                Task completed {completedCount} of {todos.length}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {todos && todos.length > 0 ? (
              todos.map((todo) => (
                <Card
                  key={todo.id}
                  {...todo}
                />
              ))
            ) : (
              <div className="pt-10">
                <p className="text-center font-semibold text-gray-500 text-xl">
                  No tasks. Create a new
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
