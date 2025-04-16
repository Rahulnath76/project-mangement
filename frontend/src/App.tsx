import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div className="font-inter w-full h-full min-h-screen text-primary">
      <Sidebar />

      <main className="absolute top-0 left-[270px] right-0 bottom-0 m-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
