export type TodoStore = {
  todos: Todo[];
  completedCount: number;
  stepCompletedCount: { [id: string]: number };
  addTodo: (todo: Todo) => void;
  editTodo: (id: string, title: string, isCompleted: boolean) => void;
  setCompletedCount: (count: number) => void;
  setStepCompletedCount: (id: string, count: number) => void;
  removeTodo: (id: string) => void;
  addTodoStep: (id: string, step: Step) => void;
  editTodoStep: (
    todoId: string,
    stepId: string,
    title: string,
    completed: boolean
  ) => void;
  removeTodoStep: (id: string, step: Step) => void;
};

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  steps: Step[];
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface Step {
  id: string;
  title: string;
  completed: boolean;
}
