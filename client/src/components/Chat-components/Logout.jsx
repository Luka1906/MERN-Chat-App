import { useNavigate } from "react-router-dom";
import { ImSwitch } from "react-icons/im";

const Logout = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <button
      onClick={logoutHandler}
      className="p-1 text-bg-color bg-primary-color-medium rounded-[0.2rem] cursor-pointer"
    >
      <ImSwitch className="text-[1.3rem]" />
    </button>
  );
};

export default Logout;
