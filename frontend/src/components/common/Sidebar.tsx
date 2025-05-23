import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleBoard } from "../../store/slices/projectSlice";
import Button from "../common/Button";
import ListElement from "./ListElement";
import { GripHorizontal, Home, TagsIcon } from "lucide-react";
import { RootState } from "../../store/store";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.profile);
  const { projectData } = useSelector((state: RootState) => state.project);
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    setCollapse(!collapse);
  }

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 ${
        collapse ? "w-[60px]" : "w-[250px]"
      } transition-all duration-300 ease-in-out bg-primary flex flex-col m-2 rounded-lg`}
    >
      {/* Header */}
      <div
        className={`border-b-2 border-gray-800 w-full flex ${
          collapse ? "justify-center" : "justify-between"
        } items-center gap-4 p-4 text-white`}
      >
        <span className={`${collapse ? "hidden" : "block"} text-lg font-bold`}>
          Task Manager
        </span>
        <button
          onClick={handleCollapse}
          className="cursor-pointer"
        >
          <GripHorizontal />
        </button>
      </div>

      {/* Main Content (scrollable) */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <div className="px-3 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar h-full">
          {/* Primary Links */}
          <ul className="flex flex-col">
            <ListElement title="Home" to="/" collapse={collapse} symbol={<Home width={20} height={20}/>}/>
            <ListElement title="Tasks" to="/" collapse={collapse} symbol={<TagsIcon />}/>
          </ul>

          <div className="flex-1 flex flex-col">
            {/* Menu Section */}
            <div className="px-1 border-b-2 border-gray-800 pb-4">
              <h3
                className={`text-[12px] text-gray-200/85 pb-2 font-semibold ${
                  collapse && "text-center"
                }`}
              >
                Menu
              </h3>
              <ul className="flex-1 flex flex-col gap-1">
                <ListElement title="Overview" to="/" collapse={collapse} />
                <ListElement title="Dashboard" to="/" collapse={collapse} />
                <ListElement title="Chart" to="/" collapse={collapse} />
                <ListElement title="Calender" to="/" collapse={collapse} />
                <ListElement title="Settings" to="/" collapse={collapse} />
              </ul>
            </div>

            {/* Projects Section */}
            <div className="flex-1 flex flex-col my-2 px-1">
              <h3 className="text-gray-200/85 font-semibold pb-2">Projects</h3>
              <ul className=" flex-1 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar">
                {!projectData || projectData.length === 0 ? (
                  <div className="text-sm text-gray-400 font-semibold">
                    No Projects found.
                  </div>
                ) : (
                  projectData.map((project) => (
                    <ListElement
                      key={project._id}
                      title={project.name}
                      to={`/projects/${project._id}`}
                      collapse={collapse}
                    />
                  ))
                )}
              </ul>
              <div className="mt-6">
                <Button
                  children={
                    <span>{`${collapse ? "+" : "Create New Project"}`}</span>
                  }
                  onclick={() => dispatch(toggleBoard())}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Profile Section - Stick to Bottom */}
        <div className="border-t-2 border-gray-800 p-3">
          <Link to={"/"} className="flex items-center gap-2 w-full">
            <img
              src=""
              alt="profile"
              width={40}
              height={40}
              className="rounded-full bg-green-500"
            />
            <div
              className={`${
                collapse ? "hidden" : "flex"
              } flex-col items-start justify-center`}
            >
              <span className="font-semibold text-gray-300">
                {user?.name || "Rahul Nath"}
              </span>
              {user?.isAdmin && (
                <span className="text-gray-400 text-sm">Admin</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
