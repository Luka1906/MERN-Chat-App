import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ContactList from "./ContactList";
import WelcomeMsg from "./WelcomeMsg";
import ChatContainer from "./ChatContainer";
import { io } from "socket.io-client";

const ChatRoom = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [currentChat, setCurrentChat] = useState(undefined);
  const [chatVisibility, setChatVisibility] = useState(false);

  const socket = useRef();

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("chat-user")));
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(process.env.REACT_APP_SERVER_URL);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const getAllContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}api/auth/allUsers/${currentUser._id}`
          );
          const data = await response.json();
          setContacts(data.users);
        } else {
          navigate("/set-avatar");
        }
      }
    };
    getAllContacts();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
  setCurrentChat(chat);
  };

  const chatVisibilityHandler = () => {
    setChatVisibility(!chatVisibility);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center  items-center gap-12">
      <div
        className={
          " h-screen w-screen  md:h-[85vh] md:w-[85vw] bg-[#00000076] grid md:grid md:grid-cols-chat-grid-tablet lg:grid-cols-chat-grid }"
        }
      >
        <ContactList
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
          chatVisibility={chatVisibility}
          setChatVisible={chatVisibilityHandler}
        />

        {currentChat === undefined ? (
          <WelcomeMsg currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
            chatVisibility={chatVisibility}
            setChatVisible={chatVisibilityHandler}
          />
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
