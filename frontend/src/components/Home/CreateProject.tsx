import { useState } from "react";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { postProject } from "../../lib/services/operations/project.api";
import type { AppDispatch } from "../../store/store";
import { X } from "lucide-react";
import { toggleBoard } from "../../store/slices/projectSlice";

const CreateProject = ({ className }: { className: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { success, loading } = useSelector((state) => state.project);

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
    console.log(data);
    dispatch(postProject(data));
    dispatch(toggleBoard());
    setData({
      name: "",
      description: "",
    });
  };

  const handleCancel = () => {
    dispatch(toggleBoard());
    setData({
      name: "",
      description: "",
    });
  };

  return (
    <div
      className={`${className} absolute inset-0 bg-primary z-50 rounded-lg shadow-lg top-0 overflow-hidden p-4 lg:px-6 text-white h-full overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar`}
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-200 font-semibold">Create a new project</p>
        <button onClick={handleCancel} className="cursor-pointer mb-2">
          <X className="mx-auto" />
        </button>
      </div>
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
          <Button
            children={<span>{loading ? "Creating..." : "Create Project"}</span>}
            px="px-8"
            onclick={handleSubmit}
          />
        </div>
        <div>
          <Button
            children={<span>Cancel</span>}
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

export default CreateProject;

// bg-[#FFF8F8]
