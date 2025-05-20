import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectDetails } from "../lib/services/operations/project.api";
import { Plus } from "lucide-react";
import {
  getAllTasks,
  updateTaskStatus,
} from "../lib/services/operations/task.api";
import CreateTaskModal from "../components/Task/TaskModal";
import Button from "../components/common/Button";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

interface Task {
  _id: string;
  title: string;
  status: "completed" | "inprogress" | "pending";
}

interface Project {
  name: string;
  description: string;
  createdAt: string;
  tasks: Task[];
}

const DisplayProject = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const refetchProject = async () => {
    const details = await getProjectDetails(id as string);
    setProjectDetails(details);
  };

  const fetchProjectDetails = async () => {
    if (!id) return;
    setLoading(true);
    const details = await getProjectDetails(id);
    setProjectDetails(details);
    // console.log(id);
    dispatch(getAllTasks(id));
    setLoading(false);
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const { tasks } = useSelector((state) => state.task);
  console.log(tasks);

  const handleStatusChange = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
    await updateTaskStatus(taskId, newStatus);
    fetchProjectDetails();
  };

  if (loading || !projectDetails) {
    return (
      <div className="p-6 min-h-screen bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-600">
        Loading project details...
      </div>
    );
  }

  const { name, createdAt, description } = projectDetails;

  const groupedTasks = {
    completed: tasks.filter((task) => task.status === "completed"),
    inprogress: tasks.filter((task) => task.status === "inprogress"),
    pending: tasks.filter((task) => task.status === "pending"),
  };

  const totalTasks = tasks.length;
  const completedPercent =
    totalTasks > 0
      ? Math.round((groupedTasks.completed.length / totalTasks) * 100)
      : 0;

  const statusColors = {
    completed: "bg-green-100 border-green-400 text-green-800",
    inprogress: "bg-yellow-100 border-yellow-400 text-yellow-800",
    pending: "bg-red-100 border-red-400 text-red-800",
  };

  const statusOptions: Task["status"][] = [
    "completed",
    "inprogress",
    "pending",
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-[#537D5C] p-6 pb-4 rounded-lg shadow-lg mb-6">
        <div className="flex justify-between items-center ">
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <h1 className="text-3xl text-[#DDEB9D] font-bold mb-1">
                  {name}
                </h1>
                <p className="text-sm mb-1 text-[#B6B09F]">
                  Created on: {new Date(createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <Button
                  onclick={() => setShowModal(true)}
                  bg="bg-primary"
                  textColor="text-[#DDF6D2]"
                  bgShadow="bg-[#B2C6D5]"
                  px="px-4"
                >
                  <Plus /> <span className="hidden sm:inline">New Task</span>
                </Button>
              </div>
            </div>
            <p className="text-[#CAE8BD] italic">
              {description.length < 30 ? description : description}
            </p>
          </div>
        </div>

        <CreateTaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          projectId={id!}
          onTaskCreated={refetchProject}
        />

        <div className="flex justify-between gap-8 items-center">
          <div className="flex gap-4 flex-wrap justify-between w-full lg:w-[50%]">
            <div>
              <h4 className="text-[#DDA853] font-bold text-xl">Completed</h4>
              <p className="text-2xl font-bold text-[#DDEB9D]">
                {groupedTasks.completed.length}
              </p>
            </div>

            <div>
              <h4 className="text-[#DDA853] font-bold text-xl">In-progress</h4>
              <p className="text-2xl font-bold text-[#DDEB9D]">
                {groupedTasks.inprogress.length}
              </p>
            </div>

            <div>
              <h4 className="text-[#DDA853] font-bold text-xl">Pending</h4>
              <p className="text-2xl font-bold text-[#DDEB9D]">
                {groupedTasks.pending.length}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="bg-[#90D1CA] rounded-full h-28 w-28 relative">
              <div className="bg-[#537D5C] h-20 w-20 absolute rounded-full top-4 left-4"></div>
              <p
                className={`font-semibold text-2xl absolute z-10 cursor-default w-full h-full flex flex-col items-center justify-center text-[#DDEB9D]`}
              >
                <span>{completedPercent}%</span>
              </p>
              <div
                className="h-28 w-28 bg-secondary rounded-full"
                style={{
                  background: `conic-gradient(#096B68 ${
                    completedPercent * 3.6
                  }deg, #d1d5db ${completedPercent * 3.6}deg)`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {totalTasks === 0 ? (
        <div className="text-center h-full w-full text-gray-700 mt-10 text-lg font-semibold">
          <div className="flex w-full h-full items-center justify-center">
            No tasks available.
          </div>
        </div>
      ) : (
        <div className="">
          {
            tasks.map((task) => (
              <div
                key={task._id}
                className={`bg-white shadow-md  px-4 py-1 border-l-4 flex items-center justify-between mb-4`}
              >
                <h3 className="text-lg font-semibold">{task.name}</h3>
                <p className="text-sm text-gray-600">
                  Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </p>
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task._id, e.target.value as Task["status"])
                  }
                  className="mt-2 p-2 border rounded"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default DisplayProject;
