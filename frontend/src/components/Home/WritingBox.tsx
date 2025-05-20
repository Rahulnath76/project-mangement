import bgWriting from "../../assets/bg-writing.jpg";
import pen from "../../assets/quill-pen.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleBoard } from "../../store/slices/projectSlice";
import CreateProject from "./CreateProject";


const WritingBox = () => {
  const projectBoard = useSelector((state) => state.project.projectBoard);
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(toggleBoard());
    console.log(projectBoard);
  };

  return (
    <div
      className={`w-full ${
        projectBoard ? "h-full" : "h-auto"
      } rounded-lg relative`}
    >
      {projectBoard && (
        <div
          className="fixed inset-0 left-[260px] bg-transparent z-40"
          onClick={toggleModal}
        ></div>
      )}

      <button
        className="relative w-full h-[150px] rounded-lg overflow-hidden cursor-pointer"
        onClick={() => dispatch(toggleBoard())}
      >
        <img src={bgWriting} alt="" className="w-full h-[150px] rounded-lg" />

        <div className="bg-white h-10 w-10 rounded-full absolute z-10 top-4 right-5 flex items-center justify-center">
          <img src={pen} alt="" className="h-6 w-6" />
        </div>
      </button>

      <CreateProject className={`${projectBoard ? "block" : "hidden"}`} />
    </div>
  );
};

export default WritingBox;
