import { useState } from "react";
import { Icon } from "@iconify/react";
import AddTask from "../drawer/add-task";
export default function index() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const todayNow = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateString = today.toLocaleDateString("en-US", options);
    const dateTimeString = `${dateString}`;
    return dateTimeString;
  };

  return (
    <div>
      <div className="flex  gap-5 justify-between  items-center  pb-5">
        <div className="flex gap-4 justify-start items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter font-satoshi text-gray-800">
              Today's Task 🔅
            </h1>
            <p className="text-gray-500">{todayNow()}</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <button className="bg-gray-500/10  text-gray-500 px-4 py-2 rounded-lg font-bold flex justify-center items-center gap-2">
            <p className="md:block hidden">Configure</p>
            <Icon
              icon="material-symbols:settings"
              className="inline-block"
            />
          </button>
          <button
            onClick={handleOpenDrawer}
            className="cursor-pointer bg-green-500/20 text-green-800 px-4 py-2 rounded-lg font-bold flex justify-center items-center gap-2"
          >
            <p className="md:block hidden"> New Task </p>
            <Icon
              icon="material-symbols:add"
              className="inline-block"
            />
          </button>
          <AddTask
            isOpen={openDrawer}
            handleOpen={() => handleOpenDrawer()}
          />
        </div>
      </div>
    </div>
  );
}
