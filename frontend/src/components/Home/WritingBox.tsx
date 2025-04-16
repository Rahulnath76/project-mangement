import bgWriting from "../../assets/bg-writing.jpg";
import pen from "../../assets/quill-pen.png";
import { toggleWritingPad } from "../../store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import WritingPanel from "./WritingPanel";


const WritingBox = () => {
  const writingpad = useSelector((state) => state.task.writingpad);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleWritingPad());
    console.log(writingpad);
  };

  return (
    <div
      className={`w-full ${
        writingpad ? "h-full" : "h-auto"
      } rounded-lg relative`}
    >
      {writingpad && (
        <div
          className="fixed inset-0 left-[260px] bg-transparent z-40"
          onClick={closeModal}
        ></div>
      )}

      <button
        className="relative w-full h-[150px] rounded-lg overflow-hidden cursor-pointer"
        onClick={() => dispatch(toggleWritingPad())}
      >
        <img src={bgWriting} alt="" className="w-full h-[150px] rounded-lg" />

        <div className="bg-white h-10 w-10 rounded-full absolute z-10 top-4 right-5 flex items-center justify-center">
          <img src={pen} alt="" className="h-6 w-6" />
        </div>
      </button>

      <WritingPanel className={`${writingpad ? "block" : "hidden"}`} />
    </div>
  );
};

export default WritingBox;
