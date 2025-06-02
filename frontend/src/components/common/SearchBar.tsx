import { Search } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Project } from "../../lib/types";
import { RootState } from "../../store/store";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const projects = useSelector((state: RootState) => state.project.projectData);

  const filteredProjects: Project[] = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#1E2B3A] text-gray-300 placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#7F8CAA]"
        />
        <button className="absolute right-3 text-gray-400 hover:text-white">
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="grid gap-1 p-2">
        {searchTerm ? (
          filteredProjects.length ? (
            filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-[#1E2B3A] p-2 rounded-lg shadow"
              >
                <h3 className="text-white font-semibold">{project.name}</h3>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No matching projects found.</p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
