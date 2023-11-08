import { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({
  currentChat,
  currentUser,
  socket,
  chatVisibility,
  setChatVisible,
}) => {
  const [receivedMessage, setReceivedMessage] = useState(null);
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}api/messages/getMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: currentUser._id,
              to: currentChat._id,
            }),
          }
        );
        const data = await response.json();

        setMessages(data);
      }
    };
    getMessages();
  }, [currentUser._id, currentChat]);

  const sendMessageHandler = async (msg) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}api/messages/addMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      }),
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setReceivedMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    receivedMessage && setMessages((prev) => [...prev, receivedMessage]);
  }, [receivedMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      <div
        className={`${
          chatVisibility ? "grid" : "hidden"
        } grid-rows-chat-grid-tablet md:grid lg:grid-rows-chat-grid :grid-rows-chat-grid-tablet gap-[0.1rem] overflow-hidden `}
      >
        <ChatHeader currentChat={currentChat} setChatVisible={setChatVisible} />
        <div className=" chat-messages px-4 py-8 flex flex-col gap-4 overflow-auto">
          {messages.map((message, index) => {
            return (
              <div
                ref={scrollRef}
                key={uuidv4()}
                className={`${
                  message.fromSelf ? "justify-end" : "justify-start"
                } flex items-center`}
              >
                <div
                  className={`${
                    message.fromSelf
                      ? " bg-message-color"
                      : " bg-primary-color-dark"
                  } text-text-color max-w-[55%] md:max-w-[50%] lg:max-w-[40%] break-words p-[0.65rem] md:p-3 lg:p-4 lg:text-[1.1rem] rounded-2xl `}
                >
                  <p>{message.message}</p>
                </div>
              </div>
            );
          })}
        </div>
        <ChatInput sendMessageHandler={sendMessageHandler} />
      </div>
    </>
  );
};

export default ChatContainer;
