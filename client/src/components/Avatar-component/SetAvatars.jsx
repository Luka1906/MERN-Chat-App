import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import multiavatar from '@multiavatar/multiavatar/esm'
import HashLoader from "react-spinners/HashLoader";

const SetAvatar = () => {
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [notSelectedError, setNotSelectedError] = useState(false);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      setNotSelectedError(true);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("chat-user"));

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/setAvatar/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar: avatars[selectedAvatar], // base64 string
          }),
        }
      );

      const data = await response.json();
      console.log(data)

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;

        localStorage.setItem("chat-user", JSON.stringify(user));
        navigate("/chat");
      }

      setNotSelectedError(false);
    } catch (err) {
      console.error("Error setting avatar:", err);
    }
  };

  useEffect(() => {
    const generateAvatars = () => {
      const data = [];

      for (let i = 0; i < 4; i++) {
        const seed = String(Math.round(Math.random() * 1000000));

        const svg = multiavatar(seed);

        const base64 = btoa(svg);

        data.push(base64);
      }

      setAvatars(data);
      setIsLoading(false);
    };

    generateAvatars();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <HashLoader color="#00dfc4" size={80} />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-12 w-screen h-screen">
          {notSelectedError && (
            <p className="text-red-500 text-xl">
              Please select an avatar!
            </p>
          )}

          <h1 className="text-white text-[1.15rem] md:text-2xl text-center">
            Choose your avatar
          </h1>

          <div className="flex md:gap-8 gap-3">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                onClick={() => setSelectedAvatar(index)}
                className={`${
                  selectedAvatar === index ? "border-blue-500" : "border-transparent"
                } border-[0.25rem] md:border-[0.4rem] p-[0.4rem] rounded-full h-20 w-20 md:w-28 md:h-28 flex justify-center items-center cursor-pointer transition`}
              >
                <img
                  className="h-full w-full"
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                />
              </div>
            ))}
          </div>

          <button
            onClick={setProfilePicture}
            className="bg-blue-500 px-8 py-4 font-bold text-white rounded-md transition hover:bg-blue-400 active:scale-95"
          >
            Set as Profile Picture
          </button>
        </div>
      )}
    </>
  );
};

export default SetAvatar;