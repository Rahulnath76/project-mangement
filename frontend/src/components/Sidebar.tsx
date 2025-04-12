import { Link } from "react-router-dom";

const ListElement = ({ title, to }: { title: string; to: string }) => {
  return (
    <li className="hover:bg-black/50 p-[10px] rounded-lg cursor-pointer text-sm text-gray-400 flex items-center gap-2">
      <Link to={to} className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-house"
          viewBox="0 0 16 16"
        >
          <path d="M8.354 1.146a.5.5 0 0 1 .292.09l6 4a.5.5 0 0 1-.354.854H12v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2.354a.5.5 0 0 1-.354-.854l6-4a.5.5 0 0 1 .354-.09zM11 7v6H5V7h6z" />
        </svg>

        <span>{title}</span>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 bottom-0 w-[250px] bg-primary flex flex-col m-2 rounded-lg">
      <div className=" border-b-2 border-gray-800 w-full flex justify-center items-center gap-4 p-4 text-white">
        <span>Task Manger</span>
        <span></span>
      </div>
      <div className="px-3 py-2">
        <ul className="flex flex-col">
          <ListElement title="Activity" to="/" />
          <ListElement title="Tasks" to="/" />
        </ul>

        <div className="mt-2 px-1 border-b-2 border-gray-800 pb-4">
          <h3 className="text-[12px] text-gray-200/85 pb-2">Menu</h3>
          <ul className="flex flex-col">
            <ListElement title="Overview" to="/" />
            <ListElement title="Dashboard" to="/" />
            <ListElement title="Chart" to="/" />
            <ListElement title="Calender" to="/" />
            <ListElement title="Settings" to="/" />
          </ul>
        </div>

        <div className="my-2 px-1">
          <h3 className="text-gray-200/85 font-semibold pb-2">Projects</h3>
          <ul className="flex flex-col">
            <ListElement title="Project 1" to="/" />
            <ListElement title="Project 2" to="/" />
          </ul>
        </div>

        <div className="relative group">
          <div className="h-full top-1.5 -z-10 left-1.5 p-2 px-4 w-full absolute bg-[#328E6E] rounded-lg group-hover:invisible transition-all duration-200"></div>
          <button className="bg-white text-primary font-bold rounded-lg p-2 px-4 mt-4 flex items-center justify-center w-full cursor-pointer hover:bg-[#328E6E] hover:text-[#FFF8F8] transition-all duration-300 ease-in-out z-10">
            Create New Project
          </button>
        </div>

        <button className=" mt-6 p-2 border-t-2 border-gray-800 flex items-center gap-2 w-full">
          <img
            src=""
            alt=""
            width={40}
            height={40}
            className="rounded-full bg-green-500"
          />
          <div className="flex flex-col items-start justify-center p-2">
            <span className="font-semibold">John Doe</span>
            <span className="text-gray-400 text-sm">Admin</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
