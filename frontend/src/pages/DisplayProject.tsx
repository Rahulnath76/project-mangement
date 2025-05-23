import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../components/common/Button";
import TaskList from "../components/project/TaskList";
import { getProjectDetails } from "../lib/services/operations/project.api";
import {
  deleteTaskThunk,
  getAllTasks,
} from "../lib/services/operations/task.api";
import { Project } from "../lib/types/index";
import { AppDispatch, RootState } from "../store/store";


const DisplayProject = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [stateChange, setStateChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const fetchProjectDetails = async () => {
    if (!id) return;
    setLoading(true);
    const details = await getProjectDetails(id);
    setProjectDetails(details);
    dispatch(getAllTasks(id));
    setLoading(false);
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id, stateChange]);

  const { tasks } = useSelector((state: RootState) => state.task);

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTaskThunk(id, taskId));
    setStateChange(!stateChange);
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

  return (
    <div className="min-h-screen">
      <div className="bg-tertiary p-6 pb-4 rounded-lg shadow-lg mb-6">
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
                  onclick={() => setCreating(true)}
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
              <div className="bg-tertiary h-20 w-20 absolute rounded-full top-4 left-4"></div>
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
        <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} projectId={id} creating={creating} setCreating={setCreating}/>
      )}
    </div>
  );
};

export default DisplayProject;
