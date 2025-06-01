import dayjs from "dayjs";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../components/common/Button";
import TaskList from "../components/project/TaskList";
import { tasksTypesList } from "../data/data";
import { getProjectDetails } from "../lib/services/operations/project.api";
import { Task } from "../lib/types/index";
import { AppDispatch, RootState } from "../store/store";

const DisplayProject = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { currentProject } = useSelector((state: RootState) => state.project);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState("all");

  const fetchProjectDetails = () => {
    if (!id) return;
    setLoading(true);
    dispatch(getProjectDetails(id));
    setLoading(false);
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const { tasks } = useSelector((state: RootState) => state.task);
  console.log(tasks);

  if (loading || !currentProject) {
    return (
      <div className="p-6 min-h-screen bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-600">
        Loading project details...
      </div>
    );
  }

  const { name, createdAt, description } = currentProject;

  const groupedTasks: Record<string, Task[]> = {
    completed: tasks.filter((task) => task.status === "completed"),
    inprogress: tasks.filter((task) => task.status === "inprogress"),
    pending: tasks.filter((task) => task.status === "pending"),
  };

  const totalTasks = tasks.length;
  const completedPercent =
    totalTasks > 0
      ? Math.round((groupedTasks.completed.length / totalTasks) * 100)
      : 0;

  let filteredTasks: Task[] =
    selected === "all" ? tasks : groupedTasks[selected];

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
                <p className="text-sm mb-1 font-semibold text-gray-700">
                  Created on: {dayjs(createdAt).format("DD MMM YY")}
                </p>
              </div>

              <div>
                <Button
                  onclick={() => {
                    setCreating(true);
                    console.log(creating);
                  }}
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
            {tasksTypesList.map(({ name }) => (
              <div key={name}>
                <h4 className="text-[#DDA853] font-bold text-xl">{name}</h4>
                <p className="text-2xl font-bold text-[#DDEB9D]">
                  {name.toLowerCase() === "all"
                    ? tasks.length : groupedTasks[name.toLowerCase()].length}
                </p>
              </div>
            ))}

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
      <div>
        <div className="flex gap-2 shadow-[0_0_12px_rgba(0,0,0,0.2)] px-2 pt-1 mb-4 rounded">
          {tasksTypesList.map(({ name }) => (
            <button
              className={`${
                selected === name.toLowerCase() &&
                "shadow-[inset_0px_-4px_0px_#537D5C]"
              } px-3 flex items-center py-1 gap-2 cursor-pointer transition-all duration-200`}
              onClick={() => {
                setSelected(name.toLowerCase());
                filteredTasks =
                  selected === "all" ? tasks : groupedTasks[name.toLowerCase()];
              }}
            >
              <span className={`${selected === name.toLowerCase() && "font-semibold"}`}>{name}</span>
              <div
                className={`${
                  selected === name.toLowerCase()
                    ? "bg-tertiary/80 text-white"
                    : "bg-gray-200"
                } px-2 rounded text-xs flex items-center font-semibold`}
              >
                {name.toLowerCase() === "all"
                  ? tasks.length
                  : groupedTasks[name.toLowerCase()].length}
              </div>
            </button>
          ))}
        </div>
        <TaskList
          tasks={filteredTasks}
          projectId={id ?? ""}
          creating={creating}
          setCreating={setCreating}
        />
      </div>
    </div>
  );
};

export default DisplayProject;
