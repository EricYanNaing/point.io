import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkCurrentUser } from "../apicalls/auth.js";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    try {
      const response = await checkCurrentUser();
      if (response.isSuccess) {
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
