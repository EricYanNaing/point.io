import { Link } from "react-router-dom";
import { BeakerIcon, UserIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

const Nav = () => {
  const { userId } = useSelector((state) => state.reducer.user);
  return (
    <nav className="bg-blue-500 flex items-center justify-between p-4 text-white ">
      <h1 className="font-bold text-2xl">
        <Link to={"/"}>POINT.IO</Link>
      </h1>
      <div className="flex items-center gap-3 text-base font-medium">
        {userId ? (
          <Link
            to={"/profile"}
            className="text-white px-2 py-1  flex items-end gap-1"
          >
            <UserIcon width={22} />
            Profile
          </Link>
        ) : (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
