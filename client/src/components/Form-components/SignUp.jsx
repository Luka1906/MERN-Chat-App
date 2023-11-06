import Logo from "./Logo";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate} from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const SignUp = () => {
  const [passShow, setPassShow] = useState(false);
  const [confirmPassShow, setConfirmPassShow] = useState(false);
  const [serverError, setServerError] = useState("")
  const navigate = useNavigate();

  const errorClass = "text-error-color text-[0.8rem] relative top-1 ";

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitSuccessful, errors },
    reset,
  } = useForm({ mode: "onTouched" });

  const passHandler = () => {
    setPassShow(!passShow);
  };

  const confirmPassHandler = () => {
    setConfirmPassShow(!confirmPassShow);
  };

  useEffect(() => {
    if (isSubmitSuccessful && !serverError) {
      reset();
     
    }

  }, [isSubmitSuccessful, reset, serverError]);

  const onSubmit = async (inputData) => {
    const {username, email, password} = inputData;
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, email, password})

    });
    const data = await response.json();
    
    if(response.status === 201) {
      navigate("/")
    } else {
      setServerError(data.msg)
    }
 
  };
  const userNameValue = watch("username");
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPassValue = watch("confirmPassword");

  return (
    <>
      <div className="flex flex-col gap-7 min-h-screen items-center justify-center ">
        <div className=" pb-8 pt-4 md:p-10 bg-[#0B2447] rounded-md shadow-card-shadow   ">
          <Logo />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-7 items-center"
          >
            {serverError && <p className="text-error-color">{serverError}</p>}
            <div className="relative w-[250px]  ">
              <input
                className={`${userNameValue? "valid" : ""} input border-[1px] border-solid border-input-color bg-transparent outline-none w-full p-2 text-text-color peer input transition duration-300 rounded-md`}
                type="text"
                name="username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 6,
                    message: " Username must be at least 6 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: " Username must not be longer than 20 characters",

                  }
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

            <div className="relative w-[250px]">
              <input
                className={`${emailValue? "valid" : ""} input border-[1px] border-solid border-input-color bg-transparent outline-none w-full p-2 text-text-color peer input transition duration-300 rounded-md`}
                type="text"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Email is not valid",
                  },
                })}
              />

              <span
                className="absolute left-0 p-2.5 text-input-color pointer-events-none transition duration-300 
            "
              >
                Email
              </span>
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>

            <div className="relative w-[250px] delay-700">
              <input
                className={`${passwordValue?
                  "valid": ""} input border-[1px] border-solid border-input-color bg-transparent outline-none w-full p-2 text-text-color peer input transition duration-300 rounded-md`}
                type={passShow ? "text" : "password"}
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
              {passShow ? (
                <AiOutlineEyeInvisible
                  onClick={passHandler}
                  className="absolute right-3 top-3 text-primary-color-medium text-xl"
                />
              ) : (
                <AiOutlineEye
                  onClick={passHandler}
                  className="absolute right-3 top-3 text-primary-color-medium text-xl"
                />
              )}

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

            <div className="relative w-[250px]">
              {confirmPassShow ? (
                <AiOutlineEyeInvisible
                  onClick={confirmPassHandler}
                  className="absolute right-3 top-3 text-primary-color-medium text-xl"
                />
              ) : (
                <AiOutlineEye
                  onClick={confirmPassHandler}
                  className="absolute right-3 top-3 text-primary-color-medium text-xl"
                />
              )}
              <input
                className={`${confirmPassValue?
                  "valid": ""} input border-[1px] border-solid border-input-color bg-transparent outline-none w-full p-2 text-text-color peer input transition duration-300 rounded-md`}
                type={confirmPassShow ? "text" : "password"}
                name="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === passwordValue || "The passwords do not match!",
                })}
              />
              <span
                className="absolute left-0 p-2.5 text-input-color  pointer-events-none transition duration-300 
            "
              >
                Confirm Password
              </span>
              {errors.confirmPassword && (
                <p className={errorClass}>{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-primary-color-medium p-2 w-[250px] text-text-color rounded-md transiton duration-300 hover:bg-primary-color-light hover:text-slate-950 active:scale-125"
            >
              CREATE USER
            </button>
            <div>
              <p className="text-text-color text-sm md:text-base">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-primary-color-medium cursor-pointer font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

    </>
  );
};

export default SignUp;
