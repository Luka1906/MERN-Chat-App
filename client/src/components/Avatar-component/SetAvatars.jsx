import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import HashLoader from "react-spinners/HashLoader";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/12345678";
  const apiKey = process.env.REACT_APP_API_KEY;
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [notSelectedError, setNotSelectedError] = useState(false);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      setNotSelectedError(true);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-user"));
      console.log(user);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/auth/setAvatar/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ avatar: avatars[selectedAvatar] }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-user", JSON.stringify(user));
        navigate("/chat");
      }

      setNotSelectedError(false);
    }
  };

  useEffect(() => {
    let data = [];
    const fetchImages = async () => {
      for (let i = 0; i < 4; i++) {
        const response = await fetch(
          `${api}/${Math.round(Math.random() * 1000)}?apikey=${apiKey}`,
          {
            method: "GET",
            "Content-Type": "text/html; charset=UTF-8",
          }
        );
        const image = await response.text();

        const buffer = Buffer.from(image);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };

    fetchImages();
  }, [apiKey]);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <HashLoader color="#00dfc4" size={80} />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-12  w-screen h-screen">
          {notSelectedError && (
            <p className="text-error-color text-xl">
              Please select the avatar!
            </p>
          )}
          <div>
            <h1 className="text-text-color text-[1.15rem] md:text-2xl text-center">
              Choose the avatar as your profile picture
            </h1>
          </div>
          <div className="flex md:gap-8 gap-3">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    selectedAvatar === index ? "selected" : ""
                  } border-[0.25rem] md:border-[0.4rem] p-[0.4rem] rounded-[5rem] h-20 w-20 md:w-28 lg:w-[7.5rem]  md:h-28 lg:h-[7.5rem] flex justify-center items-center transition duration-200 ease-in-out cursor-pointer hover:md:border-[0.4rem] hover:border-[0.25rem]  hover:border-primary-color-medium`}
                >
                  <img
                    className="h-24"
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={setProfilePicture}
            className="bg-primary-color-medium px-8 py-4 font-bold cursor-pointer uppercase text-text-color rounded-md transiton duration-300 hover:bg-primary-color-light hover:text-slate-950 active:scale-125"
          >
            Set as Profile Picture
          </button>
        </div>
      )}
    </>
  );
};

export default SetAvatar;
