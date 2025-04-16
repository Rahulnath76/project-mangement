import { useState } from "react";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setTask,
  resetTask,
  toggleWritingPad,
} from "../../store/slices/taskSlice";

import { createTask } from "../../lib/services/operations/task.api";

const WritingPanel = ({ className }: { className: string }) => {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.task);

  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const { name, description } = data;

  const handleOnChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(setTask(data));
    createTask(data, dispatch);
    dispatch(toggleWritingPad());

    if(success){
      setData({
        name: "",
        description: "",
      });
    }
  };
  const handleCancel = () => {
    dispatch(resetTask());
    setData({
      name: "",
      description: "",
    });
  };

  return (
    <div
      className={`${className} absolute inset-0 bg-primary z-50 rounded-lg shadow-lg top-0 overflow-hidden p-4 lg:px-6 text-white h-full overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar`}
    >
      <button
        onClick={handleCancel}
        className="cursor-pointer text-right w-full mb-2"
      >
        close
      </button>
      <div className="flex flex-col gap-4">
        <div>
          <p className="pb-1 text-sm text-gray-300 ">Project name</p>
          <input
            type="text"
            placeholder="Project name"
            className="w-full placeholder-gray-300/85 bg-[#183B4E] p-2 rounded focus:outline-none"
            name="name"
            value={name}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <p className="pb-1 text-sm text-gray-300 ">Project description</p>
          <textarea
            placeholder="Project description"
            className="w-full h-[220px] p-2 placeholder-gray-300/85 bg-[#183B4E] rounded focus:outline-none scrollbar scrollbar-thin scrollbar-thumb-rounded"
            name="description"
            value={description}
            onChange={handleOnChange}
          />
        </div>
      </div>

      <div className="flex justify-between my-4">
        <div>
          <Button text="Create Project" px="px-8" onclick={handleSubmit} />
        </div>
        <div>
          <Button
            text="Cancel"
            bg={"bg-[#C9B194]"}
            bgShadow="bg-tertiary"
            textColor="text-[#252A34]"
            onclick={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default WritingPanel;

// bg-[#FFF8F8]
