import { create } from "zustand";
import { TodoStore } from "@/types/todo";

export const useTodoStore = create<TodoStore>((set) => ({
  todos: JSON.parse(localStorage.getItem("todos") || "[]"),
  completedCount: 0,
  stepCompletedCount: {},
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  editTodo: (id, title, isCompleted) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, title: title, completed: isCompleted }
          : todo
      ),
    })),
  setCompletedCount: (count) => set({ completedCount: count }),
  removeTodo: (id) =>
    set((state) => {
      const todos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(todos));
      return { todos };
    }),

  addTodoStep: (id, step) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, steps: [...todo.steps, step] } : todo
      ),
    })),

    setStepCompletedCount: (id, count) =>
      set((state) => ({
        stepCompletedCount: {
          ...state.stepCompletedCount,
          [id]: count,
        },
      })),  editTodoStep: (
    todoId: string,
    stepId: string,
    title: string,
    completed: boolean
  ) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              steps: todo.steps.map((step) =>
                step.id === stepId ? { ...step, title, completed } : step
              ),
            }
          : todo
      ),
    })),
  removeTodoStep: (id, step) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, steps: todo.steps.filter((s) => s !== step) }
          : todo
      ),
    })),
}));
