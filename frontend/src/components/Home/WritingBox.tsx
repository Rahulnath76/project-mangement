import { useDispatch, useSelector } from "react-redux";
import bgWriting from "../../assets/bg-writing.jpg";
import pen from "../../assets/quill-pen.png";
import { toggleProjectCreationBoard } from "../../store/slices/appSlice";
import { RootState } from "../../store/store";
import CreateProject from "./CreateProject";


const WritingBox = () => {
  const {isProjectCreationBoardOpen} = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(toggleProjectCreationBoard());
  };

  return (
    <div
      className={`w-full rounded-lg`}
    >
      {isProjectCreationBoardOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40"
          onClick={toggleModal}
        ></div>
      )}

      <button
        className="relative w-full h-[150px] rounded-lg overflow-hidden cursor-pointer"
        onClick={() => dispatch(toggleProjectCreationBoard())}
      >
        <img src={bgWriting} alt="" className="w-full h-[150px] rounded-lg" />

        <div className="bg-white h-10 w-10 rounded-full absolute z-10 top-4 right-5 flex items-center justify-center">
          <img src={pen} alt="" className="h-6 w-6" />
        </div>
      </button>

      <CreateProject className={`${isProjectCreationBoardOpen ? "block" : "hidden"}`} />
    </div>
  );
};

export default WritingBox;
