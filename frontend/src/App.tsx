import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import WithSidebar from "./layout/WithSidebar";
import { fetchUserProjects } from "./lib/services/operations/project.api";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import SignupTest from "./pages/SignupTest";
import { AppDispatch } from "./store/store";
import DisplayProject from "./pages/DisplayProject";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state) => state.profile);
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn)

  useEffect(() => {
    if (user) {
      dispatch(fetchUserProjects());
    }
  }, [user, dispatch]);
  return (
    <div className="font-inter w-full h-full min-h-screen text-primary bg-[#ECFAE5]">
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (<WithSidebar>
              <Home />
            </WithSidebar>) : <Navigate to={"/signin"} />
          }
        />
        <Route path="/signup-test" element={<SignupTest />} />
        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signin"
          element={!isLoggedIn ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/logout"
          element={isLoggedIn ? <Logout /> : <Navigate to={"/signin"} />}
        />

        <Route path="/projects/:id" element={
          <WithSidebar>
            <DisplayProject />  
        </WithSidebar>} />
      </Routes>
    </div>
  );
};

export default App;
