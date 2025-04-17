import { create } from "zustand";
import { Todo, TodoStore } from "../types/todo";

export const useTodoStore = create<TodoStore>((set) => ({
  todos: JSON.parse(localStorage.getItem("todos") || "[]"),
  completedCount: 0,
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
  editTodoStep: (id, step) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, steps: [...todo.steps, step] } : todo
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
