import { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import { Todo } from "../../types/todo";
import { useTodoStore } from "../../store/todo";
import moment from "moment";
import { Icon } from "@iconify/react";

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
  
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [step, setStep] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddStepClick = () => {
    setIsAddingStep(true);
  };

  const handleSubmitStep = () => {
    if (step.trim()) {
      addStep(data.id, step.trim());
      setStep("");
      setIsAddingStep(false);
    }
    setIsAddingStep(false);
  };

  const handleDeleteStep = (step: string) => {
    useTodoStore.getState().removeTodoStep(data.id, step);
  };

  useEffect(() => {
    if (isAddingStep && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingStep]);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={handleOpenSheet}
    >
      <SheetContent className="p-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tighter text-gray-800">
            {data.title}
          </h1>
          <p className="text-gray-500 font-normal">
            {moment(data.createdAt).format("DD MMMM YYYY")}
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full font-satoshi">
          {data.steps.map((step, idx) => (
            <label
              key={idx}
              htmlFor={`step-${idx}`}
              className="text-gray-600 flex items-center gap-2 justify-between group shadow p-2 rounded-md text-sm cursor-pointer "
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="step"
                  id={`step-${idx}`}
                  className="accent-green-500 peer"
                />
                <span className="peer-checked:line-through">{step}</span>
              </div>
              <div className="group-hover:flex hidden  items-center">
                <button
                  onClick={() => handleDeleteStep(step)}
                  className="text-2xl cursor-pointer"
                >
                  <Icon icon="stash:times-duotone" />
                </button>
              </div>
            </label>
          ))}

          {isAddingStep ? (
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={step}
                onChange={(e) => setStep(e.target.value)}
                onBlur={() => handleSubmitStep()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmitStep();
                  if (e.key === "Escape") {
                    setStep("");
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
              className="text-left p-2 text-green-800 cursor-pointer"
            >
              Add step +
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
