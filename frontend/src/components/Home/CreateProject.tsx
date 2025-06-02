import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProject } from "../../lib/services/operations/project.api";
import { toggleProjectCreationBoard } from "../../store/slices/appSlice";
import type { AppDispatch, RootState } from "../../store/store";
import Button from "../common/Button";

const CreateProject = ({ className }: { className: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.project);

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
  });

  const { name, description, category } = data;

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
    if (!name || !description || !category) return;
    dispatch(postProject(data));
    dispatch(toggleProjectCreationBoard());
    setData({
      name: "",
      description: "",
      category: "",
    });
  };

  const handleCancel = () => {
    dispatch(toggleProjectCreationBoard());
    setData({
      name: "",
      description: "",
      category: "",
    });
  };

  return (
    <div
      className={`${className} fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm`}
    >
      <div className="bg-[#1E2B3A] text-white w-full max-w-xl sm:max-w-lg mx-4 rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 relative overflow-y-auto max-h-[95vh]">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-300 cursor-pointer hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold">
            Start Something New 🚀
          </h2>
          <p className="text-sm text-gray-400">
            Begin by giving your project a name and description.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Project Category
            </label>
            <input
              type="text"
              placeholder="e.g. Web App, AI Tool, Fintech"
              className="w-full rounded-lg bg-[#2A3F53] px-4 py-2 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
              name="category"
              value={category}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Project Name
            </label>
            <input
              type="text"
              placeholder="Give your project a title"
              className="w-full rounded-lg bg-[#2A3F53] px-4 py-2 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
              name="name"
              value={name}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Description
            </label>
            <textarea
              placeholder="Describe the goals, features, and scope..."
              className="w-full h-32 rounded-lg bg-[#2A3F53] px-4 py-2 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-secondary resize-none scrollbar-thin text-sm"
              name="description"
              value={description}
              onChange={handleOnChange}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <Button
            bg="bg-gray-600"
            bgShadow="bg-gray-700"
            textColor="text-white"
            onclick={handleCancel}
          >
            <span>Cancel</span>
          </Button>
          <Button px="px-6" onclick={handleSubmit}>
            <span>{loading ? "Creating..." : "Create Project"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
