import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Todo } from '@/types/todo';
import { useTodoStore } from '@/store/todo';
import moment from 'moment';
import { Icon } from '@iconify/react';
import { v4 as uuidv4 } from 'uuid';
import { Step } from '@/types/todo';
import DueDatePicker from '@/components/datepicker/due-date';
export default function ExtraTodo({
  isOpen,
  handleOpenSheet,
  data,
}: {
  isOpen: boolean;
  handleOpenSheet: () => void;
  data: Todo;
}) {
  const addStep = useTodoStore((state) => state.addTodoStep);
  const editStep = useTodoStore((state) => state.editTodoStep);

  const [isAddingStep, setIsAddingStep] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState({
    id: '',
    title: '',
    completed: false,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddStepClick = () => {
    setIsAddingStep(true);
  };

  const handleEditStep = (step: Step) => {
    setStep(step);
    setIsEditing(true);
  };

  const handleSubmitStep = () => {
    const steps: Step = {
      id: step.id,
      title: step.title.trim(),
      completed: step.completed,
    };

    if (step.title.trim()) {
      addStep(data.id, steps);
      setStep({ id: '', title: '', completed: false });
      setIsAddingStep(false);
    }
    setIsAddingStep(false);
  };

  const handleToggleStep = (checked: boolean, step: Step) => {
    editStep(data.id, step.id, step.title, checked);
  };

  const handleDeleteStep = (step: Step) => {
    useTodoStore.getState().removeTodoStep(data.id, step);
  };

  useEffect(() => {
    if (isAddingStep && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingStep]);

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenSheet}>
      <SheetHeader className="flex items-center justify-between p-4">
        <SheetTitle className="sr-only">{data.title}</SheetTitle>
      </SheetHeader>
      <SheetContent className="font-satoshi p-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tighter text-gray-800">{data.title}</h1>
          <p className="font-normal text-gray-500">
            {moment(data.createdAt).format('dddd,DD MMMM, YYYY')}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-800">Due date :</p>
          <DueDatePicker />
        </div>
        <div className="font-satoshi flex w-full flex-col gap-4">
          {data.steps.map((step, idx) => (
            <label
              key={idx}
              htmlFor={`step-${idx}`}
              className="group flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 text-sm text-gray-600 shadow"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="step"
                  onChange={(e) => handleToggleStep(e.target.checked, step)}
                  checked={step.completed}
                  id={`step-${idx}`}
                  className="peer accent-green-500"
                />
                <span className="peer-checked:line-through">{step.title}</span>
              </div>
              <div className="hidden items-center group-hover:flex">
                <button onClick={() => handleDeleteStep(step)} className="cursor-pointer text-2xl">
                  <Icon icon="stash:times-duotone" />
                </button>
              </div>
            </label>
          ))}

          {isEditing && (
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={step.title}
                onChange={(e) => setStep({ ...step, title: e.target.value })}
                maxLength={30}
                onBlur={() => handleSubmitStep()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmitStep();
                  if (e.key === 'Escape') {
                    setStep({ id: '', title: '', completed: false });
                    setIsEditing(false);
                  }
                }}
                className="flex-1 border-b border-green-500 px-1 py-1 text-sm outline-none"
                placeholder="Create new step your task..."
              />
            </div>
          )}

          {isAddingStep ? (
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={step.title}
                onChange={(e) =>
                  setStep({
                    id: uuidv4(),
                    title: e.target.value,
                    completed: false,
                  })
                }
                maxLength={30}
                onBlur={() => handleSubmitStep()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmitStep();
                  if (e.key === 'Escape') {
                    setStep({
                      id: '',
                      title: '',
                      completed: false,
                    });
                    setIsAddingStep(false);
                  }
                }}
                className="flex-1 border-b border-green-500 px-1 py-1 text-sm outline-none"
                placeholder="Create new step your task..."
              />
            </div>
          ) : (
            <button
              onClick={handleAddStepClick}
              className="cursor-pointer p-2 text-left text-green-800"
            >
              Add step +
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
