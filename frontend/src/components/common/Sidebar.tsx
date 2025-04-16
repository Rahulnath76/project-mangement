import { Link } from "react-router-dom";
import Button from "../common/Button";
import { useState } from "react";
import { toggleWritingPad } from "../../store/slices/taskSlice";
import { useDispatch } from "react-redux";

const ListElement = ({ title, to, collapse }: { title: string; to: string, collapse?: boolean }) => {

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

        <span className={`${collapse ? "hidden" : "block"}`}>{title}</span>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState(false);
  
  return (
    <div className={`fixed top-0 left-0 bottom-0 ${collapse ? "w-[60px]" : "w-[250px]"} transition-all duration-300 ease-initial bg-primary flex flex-col m-2 rounded-lg`}>
      <div className={`border-b-2 border-gray-800 w-full flex ${collapse ? "justify-center" : "justify-between"} items-center gap-4 p-4 text-white`}>
        <span className={`${collapse ? "hidden" : "block"} text-lg font-bold`}>Task Manger</span>
        <button onClick={() => setCollapse(!collapse)} className="cursor-pointer">Co</button>
      </div> 
      <div className="px-3 py-2">
        <ul className="flex flex-col">
          <ListElement title="Home" to="/" collapse={collapse}/>
          <ListElement title="Tasks" to="/" collapse={collapse}/>
        </ul>

        <div className="mt-2 px-1 border-b-2 border-gray-800 pb-4 ">
          <h3 className={`text-[12px] text-gray-200/85 pb-2 font-semibold ${collapse && "text-center"}`}>Menu</h3>
          <ul className="flex flex-col overflow-y-auto h-[190px] scrollbar-thin scrollbar-thumb-rounded scrollbar">
            <ListElement title="Overview" to="/" collapse={collapse}/>
            <ListElement title="Dashboard" to="/" collapse={collapse}/>
            <ListElement title="Chart" to="/" collapse={collapse}/>
            <ListElement title="Calender" to="/" collapse={collapse}/>
            <ListElement title="Settings" to="/" collapse={collapse}/>
          </ul>
        </div>

        <div className="my-2 px-1">
          <h3 className="text-gray-200/85 font-semibold pb-2">Projects</h3>
          <ul className="flex flex-col h-[90px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar">
            <ListElement title="Project 1" to="/" />
            <ListElement title="Project 2" to="/" />
          </ul>
        </div>

        <Button text={`${collapse ? "+" : "Create New Project"}`} onclick={() => dispatch(toggleWritingPad())}/>

        <Link to={"/"} className=" mt-6 p-2 border-t-2 border-gray-800 flex items-center gap-2 w-full">
          <img
            src=""
            alt=""
            width={40}
            height={40}
            className="rounded-full bg-green-500"
          />
          <div className={`${collapse ? "hidden" : "flex"} flex-col items-start justify-center p-2`}>
            <span className="font-semibold text-gray-300">John Doe</span>
            <span className="text-gray-400 text-sm">Admin</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
