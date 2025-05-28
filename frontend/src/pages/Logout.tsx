import { useDispatch, useSelector } from "react-redux"
import { logout } from "../lib/services/operations/auth.api";
import { AppDispatch } from "../store/store";

const Logout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {isLoggedIn} = useSelector(state => state.auth);
    const handleLogout = () => {
        dispatch(logout());
        if(!isLoggedIn)
          console.log("logout successful")
    }
  return (
    <button className="bg-black p-2 rounded text-white" onClick={handleLogout}>
        Logout
    </button>
  )
}

export default Logout