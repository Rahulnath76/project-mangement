import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { toggleBoard } from "../../store/slices/projectSlice";

const ProjectContainer = () => {
  const dispatch = useDispatch();
  const projectBoard = useSelector((state) => state.project.projectBoard);
  const { projectData } = useSelector((state) => state.project);
  console.log(projectData);
  const toggleModal = () => {
    dispatch(toggleBoard());
    console.log(projectBoard);
  };

  return (
    <div className="text-primary p-4 rounded-lg h-full mt-2">
      <div className="flex gap-4 flex-wrap">
        {(!projectData || !projectData.length) ? (
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
          projectData.map((item) => (
            <div className="w-[270px] h-max relative group z-50" key={item._id}>
              <div className="w-full h-full top-2 left-2 bg-primary absolute rounded-lg -z-10 group-hover:invisible transition-all duration-200"></div>

              <Link
                to={`/projects/${item._id}`}
                className={`bg-secondary px-3 py-4 rounded-lg w-full block hover:translate-1 text-[#180120]  transition-all duration-200 ease-in-out z-10`}
              >
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm text-gray-800 transition-all duration-200 ease-in-out">
                  {item.description.length < 30
                    ? item.description
                    : `${item.description.slice(0, 30)}...`}
                </p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectContainer;
