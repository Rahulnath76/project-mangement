import { useDispatch, useSelector } from "react-redux"
import { logout } from "../lib/services/operations/auth.api";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state :RootState) => state.auth);
    const handleLogout = () => {
        dispatch(logout(navigate));
        if(!isLoggedIn)
          console.log("logout successful")
    }
  return (
    <button className="bg-black p-2 rounded text-white" onClick={handleLogout}>
        Logout
    </button>
  )
}

export default Logout;