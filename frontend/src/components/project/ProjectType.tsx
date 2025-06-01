import React from "react";

const ProjectType = ({selected, setSelected}) => {
  return (
    <button
      className={`${
        selected === "all" && "shadow-[inset_0px_-4px_0px_#537D5C]"
      } px-3 flex items-center py-1 gap-2 cursor-pointer transition-all duration-200`}
      onClick={() => {
        setSelected("all");
      }}
    >
      <span>All</span>
      <div
        className={`${
          selected === "all" ? "bg-tertiary/80 text-white" : "bg-gray-200"
        } px-2 rounded text-xs flex items-center font-semibold`}
      >
        {tasks.length}
      </div>
    </button>
  );
};

export default ProjectType;
