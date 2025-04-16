import { Link } from "react-router-dom";
import { data } from "../../data/data";
const colors: string[] = ["#fff", "#000", "#333"];

const MainContent = () => {
  const index: number = Math.floor(Math.random() * colors.length);
  const color = colors[index];
  console.log(color);
  return (
    <div className="text-primary p-4 rounded-lg h-full  mt-2">
      <div className="flex gap-4 flex-wrap">
        {data.map((item) => (
          <div className="w-[270px] h-max relative group" key={item.name}>
            <div className="w-full h-full top-2 left-2 bg-primary absolute rounded-lg -z-10 group-hover:invisible transition-all duration-200"></div>

            <Link
              to={"/"}
              className={`bg-secondary px-3 py-4 rounded-lg w-full block hover:translate-1 text-[#180120] hover:bg-[#a0cdaf] hover:text-[#356c69] transition-all duration-200 ease-in-out z-10`}
            >
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-sm text-[#392a07]">
                {item.description.length < 30
                  ? item.description
                  : `${item.description.slice(0, 30)}...`}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
