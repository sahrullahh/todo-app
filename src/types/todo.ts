export type TodoStore = {
  todos: Todo[];
  completedCount: number;
  addTodo: (todo: Todo) => void;
  editTodo: (id: string, title: string, isCompleted: boolean) => void;
  setCompletedCount: (count: number) => void;
  removeTodo: (id: string) => void;
  addTodoStep: (id: string, step: string) => void;
  editTodoStep: (id: string, step: string) => void;
  removeTodoStep: (id: string, step: string) => void;
};

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  steps: string[];
  createdAt: Date;
}

export interface Step {
  id: string;
  title: string;
  completed: boolean;
}
