import { Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../../lib/services/operations/task.api";
import { Task } from "../../lib/types";
import { AppDispatch, RootState } from "../../store/store";

interface Props {
  tasks: Task[];
  handleDeleteTask: (taskId: string) => void;
  projectId: string;
  creating: boolean;
  setCreating: (v: boolean) => void;
}

const TaskList = ({
  tasks,
  handleDeleteTask,
  projectId,
  creating,
  setCreating,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { success } = useSelector((state: RootState) => state.task);
  const inputRef = useRef<HTMLInputElement>(null);
  const [taskname, setTaskName] = useState("");

  const [selectedStatuses, setSelectedStatuses] = useState(
    Object.fromEntries(tasks.map((task) => [task._id, task.status]))
  );
  const [editingTaskId, setEditingTaskId] = useState<Task["_id"] | null>(null);
  const [editingTaskName, setEditingTaskName] = useState("");

  useEffect(() => {
    setSelectedStatuses(
      Object.fromEntries(tasks.map((task) => [task._id, task.status]))
    );
  }, [tasks]);

  const handleChange = (
    taskId: string,
    name: string | undefined,
    newStatus: string | undefined
  ) => {
    dispatch(updateTask({ name, status: newStatus }, projectId, taskId));
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    const oldStatus = selectedStatuses[taskId];
    if (oldStatus === newStatus) return;

    handleChange(taskId, undefined, newStatus);
    setSelectedStatuses((prev) => ({
      ...prev,
      [taskId]: newStatus as Task["status"],
    }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    taskId: Task["_id"]
  ) => {
    {
      const originalName = tasks.find((task) => task._id === taskId)?.name;

      if (e.key === "Enter") {
        if (
          editingTaskName.trim() === "" ||
          editingTaskName === undefined ||
          originalName === editingTaskName
        ) {
          setEditingTaskId(null);
          setEditingTaskName("");
          return;
        }
        handleChange(taskId, editingTaskName, undefined);
        setEditingTaskId(null);
        setEditingTaskName("");
      } else if (e.key === "Escape") {
        setEditingTaskId(null);
        setEditingTaskName("");
      }
    }
  };

  const handleOnBlur = (taskId: Task["_id"]) => {
    const originalName = tasks.find((task) => task._id === taskId)?.name;
    if (editingTaskName.trim() === "" || editingTaskName === originalName) {
      setEditingTaskId(null);
      setEditingTaskName("");
      return;
    }
    handleChange(taskId, editingTaskName, undefined);
    setEditingTaskId(null);
    setEditingTaskName("");
  };

  const statusOptions = [
    { id: "completed", label: "Completed" },
    { id: "inprogress", label: "Inprogress" },
    { id: "pending", label: "Pending" },
  ];

  const handleCreateTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (taskname.trim() === "") return;
      dispatch(createTask({ name: taskname }, projectId));
      setCreating(false);
      setTaskName("");
    }
  };

  const handleOnBlurCreate = () => {
    if (taskname.trim() === "") {
      setCreating(false);
      setTaskName("");
    }
    dispatch(createTask({ name: taskname }, projectId));
    setCreating(false);
    setTaskName("");
  };
  const colors = {
    completed: "bg-[#DDA853] border-[#DDA853]",
    inprogress: "bg-[#4F46E5] border-[#4F46E5]",
    pending: "bg-[#EF4444] border-[#EF4444]",
  };

  return (
    <div className="">
      {creating && (
        <div className="bg-gray-50 shadow-md px-4 py-2 border-l-4 flex items-center justify-between mb-4 gap-2">
          <input
            type="text"
            value={taskname}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyDown={(e) => handleCreateTask(e)}
            onBlur={() => {
              handleOnBlurCreate();
            }}
            autoFocus
            placeholder="Enter task name"
            className="w-full px-2 rounded focus:outline-none text-lg font-semibold"
          />
        </div>
      )}

      {tasks.length === 0 && !creating && (
        <div className="text-center text-gray-700 mt-10 text-lg font-semibold">
          No tasks available.
        </div>
      )}

      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-gray-50 shadow-md px-4 py-2 border-l-4 flex items-center justify-between mb-4 gap-2"
        >
          <div
            className="flex items-center gap-4 flex-1"
            onDoubleClick={() => {
              setEditingTaskId(task._id);
              setEditingTaskName(task.name);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }}
          >
            {editingTaskId === task._id ? (
              <input
                type="text"
                value={editingTaskName}
                ref={inputRef}
                className="w-full px-2 border-2 rounded focus:outline-none text-lg font-semibold"
                onChange={(e) => setEditingTaskName(e.target.value)}
                onBlur={() => handleOnBlur(task._id)}
                onKeyDown={(e) => handleKeyDown(e, task._id)}
              />
            ) : (
              <h3 className="text-lg font-semibold">{task.name}</h3>
            )}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">
              Status:{" "}
              {selectedStatuses[task._id]?.charAt(0).toUpperCase() +
                selectedStatuses[task._id]?.slice(1)}
            </p>

            <div className="flex gap-3">
              {statusOptions.map((option) => (
                <button
                  key={option.id}
                  className="group relative flex items-center cursor-pointer transition-all duration-200"
                  onClick={() => handleStatusChange(task._id, option.id)}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200
                      ${
                        selectedStatuses[task._id] === option.id
                          ? `${colors[option.id]}`
                          : "bg-white border-gray-400"
                      }
                    `}
                  >
                    {selectedStatuses[task._id] === option.id && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </span>

                  <div className="hidden group-hover:flex bg-tertiary p-[2px] text-[#DDA853] font-semibold rounded-md absolute -top-6 -left-5 text-xs">
                    {option.label}
                  </div>
                </button>
              ))}
            </div>

            <button onClick={() => handleDeleteTask(task._id)}>
              <Trash className="h-6 w-6 hover:text-red-500 transition-all duration-150" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
