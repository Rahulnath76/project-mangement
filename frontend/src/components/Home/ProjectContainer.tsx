import { Pin, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleProjectCreationBoard } from "../../store/slices/appSlice";
import { RootState } from "../../store/store";
import ProjectList from "../project/ProjectList";

const ProjectContainer = () => {
  const dispatch = useDispatch();
  const { projectData } = useSelector((state: RootState) => state.project);
  const toggleModal = () => {
    dispatch(toggleProjectCreationBoard());
  };

  return (
    <div className="text-primary p-4 rounded-lg h-full mt-2">
      <div className="mb-6">
        <div className="text-primary font-bold text-2xl flex items-center justify-between w-fit gap-2">
          <h3>Projects</h3>
          <Pin className="fill-rose-600 outline-none rotate-45"/>
        </div>
        <p className="text-sm">Here is the list of projects you have created</p>
      </div>

      <div className="flex gap-4 flex-wrap">
        {!projectData || projectData.length === 0 ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">No projects found</h2>
            <p className="text-sm text-gray-400">Create New</p>
            <div className="flex items-center justify-center w-full h-full flex-1">
              <button
                onClick={toggleModal}
                className="bg-gray-500 cursor-pointer text-white rounded-full p-2 flex items-center justify-center w-25 h-25"
              >
                <Plus className="h-20 w-20" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 flex-wrap">
            {projectData.map((item) => (
              <ProjectList key={item._id} item={item}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectContainer;
