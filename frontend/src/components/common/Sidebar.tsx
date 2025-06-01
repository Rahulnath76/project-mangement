import { GripHorizontal, Home, TagsIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toggleProjectCreationBoard, toggleSidebar } from "../../store/slices/appSlice";
import { AppDispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import ListElement from "./ListElement";

interface Props{
  isSidebarOpen: boolean;
}

const Sidebar = ({isSidebarOpen}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.profile);
  const { projectData } = useSelector((state: RootState) => state.project);

  const { id } = useParams();

  const handleCollapse = () => {
    dispatch(toggleSidebar())
  }

  return (
    !isSidebarOpen ? 
    ( <button
          onClick={handleCollapse}
          className="cursor-pointer bg-[#7F8CAA] p-2 rounded-xl z-20 fixed top-6 left-5"
        >
          <GripHorizontal className="text-white size-5" />
        </button>) : 
    (
      <div
      className={`fixed top-0 left-0 bottom-0 ${
        !isSidebarOpen ? "hidden" : "w-[250px]"
      } bg-primary flex flex-col m-2 rounded-lg`}
    >
      {/* Header */}
      <div
        className={`border-b-2 border-gray-800 w-full flex justify-between items-center gap-4 p-4 text-white`}
      >
        <span className={`text-lg font-bold`}>
          Task Manager
        </span>
        <button
          onClick={handleCollapse}
          className="cursor-pointer"
        >
          <GripHorizontal />
        </button>
      </div>

      <div className={`flex-1 flex flex-col justify-between overflow-hidden`}>
        <div className={` py-2 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar h-full`}>
          <ul className="flex flex-col">
            <ListElement title="Home" to="/"  symbol={<Home width={20} height={20}/>}/>
            <ListElement title="Tasks" to="/" symbol={<TagsIcon />}/>
          </ul>

          <div className="flex-1 flex flex-col">
            <div className="px-1 border-b-2 border-gray-800 pb-2">
              <h3
                className={`text-[12px] text-gray-200/85 pb-2 font-semibold`}
              >
                Menu
              </h3>
              <ul className="flex-1 flex flex-col gap-1">
                <ListElement title="Overview" to="/" />
                <ListElement title="Dashboard" to="/" />
                <ListElement title="Chart" to="/" />
                <ListElement title="Calender" to="/" />
                <ListElement title="Settings" to="/" />
              </ul>
            </div>

            {/* Projects Section */}
            <div className={`flex-1 flex flex-col my-2`}>
              <h3 className="text-gray-200/85 font-semibold pb-2">Projects</h3>
              <ul className="flex-1 flex flex-col">
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
              <div className="mt-6">
                <Button
                  children={
                    <span>Create New Project</span>
                  }
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
            <div
              className={`flex flex-col items-start justify-center`}
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
    )
    
  
  );
};

export default Sidebar;
