import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkCurrentUser } from "../apicalls/auth.js";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice.js";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    try {
      const response = await checkCurrentUser();
      if (response.isSuccess) {
        dispatch(setUser(response.userDoc));
        // code
      } else {
        navigate("/");
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return <section>{children}</section>;
};

export default AuthProvider;
