import { useEffect, useState } from "react";
import Logout from "./Logout";
import { BiArrowBack } from "react-icons/bi";
import { useMediaQuery } from "@mui/material";

const ChatHeader = ({ currentChat,setChatVisible }) => {
  const windowScreen = useMediaQuery("(max-width:767px)");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (windowScreen) {
      setIsMobile(true);
 
    } else {
      setIsMobile(false);

    }
  }, [windowScreen]);

  return (
    <div className="flex items-center justify-between  px-8 py-2 ">
      {isMobile && (
        <BiArrowBack
          className="  text-primary-color-medium text-[1.7rem] cursor-pointer"
          onClick={
           setChatVisible
          }
        />
      )}

      <div className="flex items-center gap-4 ">
        <img
          className="h-12"
          src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
          alt="avatar"
        />
        <div className="text-text-color font-bold">
          <h3>{currentChat.username}</h3>
        </div>
      </div>
      <Logout />
    </div>
  );
};

export default ChatHeader;
