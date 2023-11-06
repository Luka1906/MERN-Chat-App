import Logo from "./Logo";
import { Link } from "react-router-dom";

const ForgotPass = () => {
  return (
    <>
      <div className="flex flex-col gap-7 min-h-screen items-center justify-center ">
        <div className=" px-6 py-14 bg-[#0B2447] rounded-md shadow-card-shadow ">
          <div className="flex flex-col items-center text-text-color gap-4">
            <Logo />
            <h2 className="text-xl text-primary-color-light font-semibold">
              Forgot password?
            </h2>
            <p className="w-[350px] text-center mb-8 ">
              Please enter the email address you used to create your account,
              and we'll send you a link to reset your password.
            </p>
          </div>

          <form className="flex flex-col gap-7 items-center ">
            <div className="relative w-[350px]">
              <input
                className="input border-[1px] border-solid border-input-color bg-transparent outline-none w-full p-2 text-text-color peer transition duration-300 rounded-md "
                type="text"
                id="username"
                required
              />
              <span
                className="absolute left-0 p-2.5 text-input-color pointer-events-none transition duration-300 
              "
              >
                Email
              </span>
            </div>
            <Link to="/">
              <button className="bg-primary-color-medium p-2 w-[350px] text-text-color rounded-md">
                Submit
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
