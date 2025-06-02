import { ChevronRight, GripHorizontal, Home, TagsIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  toggleProjectCreationBoard,
  toggleSidebar,
} from "../../store/slices/appSlice";
import { AppDispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import ListElement from "./ListElement";
import SearchBar from "./SearchBar";

interface Props {
  isSidebarOpen: boolean;
}

const Sidebar = ({ isSidebarOpen }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.profile);
  const { projectData } = useSelector((state: RootState) => state.project);
  const [showProjects, setShowProjects] = useState(true);

  const { id } = useParams();

  const handleCollapse = () => {
    dispatch(toggleSidebar());
  };

  return !isSidebarOpen ? (
    <button
      onClick={handleCollapse}
      className="cursor-pointer bg-[#7F8CAA] p-2 rounded-xl z-20 fixed top-6 left-5"
    >
      <GripHorizontal className="text-white size-5" />
    </button>
  ) : (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur z-30 sm:hidden"
          onClick={handleCollapse}
        />
      )}
      <div
        className={`fixed top-0 left-0 bottom-0 z-40
      w-[250px] bg-primary flex flex-col m-2 rounded-lg 
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      transition-all duration-200
      md:translate-x-0  md:z-auto`}
      >
        {/* Header */}
        <div
          className={`border-b-2 border-gray-800 w-full flex justify-between items-center gap-4 p-4 text-white`}
        >
          <span className={`text-lg font-bold`}>Project Manager</span>
          <button onClick={handleCollapse} className="cursor-pointer">
            <GripHorizontal />
          </button>
        </div>

        <div className={`flex-1 flex flex-col justify-between overflow-hidden`}>
          <div
            className={` py-2 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar h-full`}
          >
            <ul className="flex flex-col">
              <ListElement
                title="Home"
                to="/"
                symbol={<Home width={20} height={20} />}
              />
              <ListElement title="Projects" to="/" symbol={<TagsIcon />} />
            </ul>

            <SearchBar />

            <div className="flex-1 flex flex-col">
              {/* Projects Section */}
              <div className={`flex-1 flex flex-col my-2`}>
                <div
                  onClick={() => setShowProjects((prev) => !prev)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <h3 className="text-gray-200/85 font-semibold pb-2">
                    Projects
                  </h3>
                  <ChevronRight
                    className={`transition-transform text-white duration-200 ${
                      showProjects ? "rotate-90" : "-rotate-90"
                    }`}
                  />
                </div>
                <ul
                  className={`${
                    showProjects ? "block" : "hidden"
                  } flex flex-1 flex-col transition-all duration-200 ease-in-out`}
                >
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
                        opened={id === project._id}
                      />
                    ))
                  )}
                </ul>
                <div className="mt-auto">
                  <Button
                    children={<span>Create New Project</span>}
                    onclick={() => dispatch(toggleProjectCreationBoard())}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Profile Section - Stick to Bottom */}
          <div className="border-t-2 border-gray-800 p-3">
            <Link to={"/logout"} className="flex items-center gap-2 w-full">
              <img
                src={user.profilePic}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full bg-green-500"
              />
              <div className={`flex flex-col items-start justify-center`}>
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
    </>
  );
};

export default Sidebar;
