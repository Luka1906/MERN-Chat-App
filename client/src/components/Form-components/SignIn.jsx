import Logo from "./Logo";
import { Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const [serverError, setServerError] = useState();
  const navigate = useNavigate()
  
  const onSubmit = async (inputData) => {
    const {username, password} = inputData;
   

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})

    });
    const data = await response.json();

    if(response.status === 200) {
      localStorage.setItem("chat-user", JSON.stringify(data));
      navigate("set-avatar")
    }
    else {
      setServerError(data.msg)
    }
    
  };

  const errorClass = "text-error-color text-[0.8rem] relative top-1 ";

  const userNameValue = watch("username");
  const passwordValue = watch("password");

  return (
    <>
      <div className="flex flex-col gap-7 min-h-screen items-center justify-center ">
        <div className=" pb-8 pt-4 md:p-10 bg-[#0B2447] rounded-md shadow-card-shadow   ">
          <Logo />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-7 items-center "
          >
            {serverError && <p className="text-error-color">{serverError}</p>}
            <div className="relative w-[250px]  ">
              <input
                className={`${userNameValue? "valid" : ""} input border-[1px] border-solid borderr bg-transparent outline-none w-full p-2 text-text-color peer input transition duration-300 rounded-md`}
                type="text"
                name="username"
                {...register("username", {
                  required: "Username is invalid",
                  minLength: {
                    value: 6,
                    message: "Username must be at least 6 characters long",
                  },
                })}
              />
              <span
                className="absolute left-0 p-2.5 text-input-color pointer-events-none transition duration-300 
                "
              >
                Username
              </span>
              {errors.username && (
                <p className={errorClass}>{errors.username.message}</p>
              )}
            </div>

            <div className="relative w-[250px] delay-700">
              <input
               className={`${passwordValue? "valid" : ""} input border-[1px] border-solid border-input-color bg-transparent outline-none w-full p-2 text-text-color peer input transition duration-300 rounded-md`}
                type="password"
                name="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                    message:
                      "Password must be At least 8 characters long; Has at least one uppercase and one lowercase letter;  Has at least one number and one special character",
                  },
                })}
              />
              <span
                className="absolute left-0 p-2.5 text-input-color  pointer-events-none transition duration-300 
                "
              >
                Password
              </span>
              {errors.password && (
                <div className={errorClass}>{errors.password.message}</div>
              )}
            </div>

            <button
              type="submit"
              className="bg-primary-color-medium p-2 w-[250px] text-text-color rounded-md transiton duration-300 hover:bg-primary-color-light hover:text-slate-950 active:scale-125"
            >
              LOGIN
            </button>
            <div>
              <p className="text-text-color text-sm md:text-base">
                Dont have an account?{" "}
                <Link
                  to="register"
                  className="text-primary-color-medium cursor-pointer font-medium"
                >
                  Register
                </Link>
              </p>

              <Link to="forgot-pass" className="text-text-color text text-sm md:text-base">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
