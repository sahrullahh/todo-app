import Card from "@/components/card";
import { Icon } from "@iconify/react";
import { useTodoStore } from "@/store/todo";

export default function index() {
  const todos = useTodoStore((state) => state.todos);
  const completedCount = useTodoStore((state) => state.completedCount);

  return (
    <>
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
    </>
  );
}
