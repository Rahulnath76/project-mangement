import { Calendar, EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "../../lib/types";
import dayjs from "dayjs";
import { useState } from "react";
import { deleteProject } from "../../lib/services/operations/project.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

const ProjectList = ({ item }: { item: Project }) => {
  const [openNav, setOpenNav] = useState(false);
  const formattedDate = dayjs(item.createdAt).format("DD MMM YY");
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    await dispatch(deleteProject(item._id));
  } 

  return (
    <div className="relative shadow-[0_0_12px_rgba(0,0,0,0.2)] rounded-lg p-4 w-[215px] h-[260px] flex flex-col">
      <div className={`${openNav ? "absolute": "hidden"} inset-0 bg-transparent`} onClick={() => setOpenNav(false)}></div>
      
      <div className="flex justify-between items-center mb-4 relative">
        {/* tag */}
        <Link to={`/`} className="bg-secondary/40 px-4 rounded-xl">
          <span className="font-bold text-secondary text-sm">{item.category.slice(0, 15)}</span>
        </Link>
        <button
          className="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
          onClick={() => setOpenNav(!openNav)}
        >
          <EllipsisVertical className="size-5" />
        </button>
        {/*  */}
        <div
          className={`${
            openNav ? "absolute" : "hidden"
          } bg-tertiary/20 py-2 top-8 right-4 rounded-lg flex flex-col divide-y-2 divide-tertiary transition-all duration-200`}
        >
          <button className="cursor-pointer hover:bg-tertiary/40 px-2 py-1 transition-all duration-200">
            Edit
          </button>
          <button className="cursor-pointer hover:bg-tertiary/40 px-2 py-1 transition-all duration-200" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
        <Link to={`/projects/${item._id}`} className={`w-full h-full flex-1`}>
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-sm text-gray-700 transition-all duration-200 ease-in-out">
            {item.description.length < 30
              ? item.description
              : `${item.description.slice(0, 30)}...`}
          </p>
        </Link>


      <div className="ml-auto">
        <div className="flex text-xs items-center gap-2 text-gray-500">
          <Calendar className="size-[18px]" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
