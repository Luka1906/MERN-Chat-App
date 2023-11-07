import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsFillEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({ sendMessageHandler }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");

  const emojiToggleHandler = () => {
    setShowEmoji(!showEmoji);
  };

  const emojiClickHandler = (emoji) => {
    let message = msg;
    message += " " + emoji.emoji;
    setMsg(message);
    console.log(emoji);
  };

  const chatHandler = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      sendMessageHandler(msg);
      setMsg("");
    }
  };

  return (
    <div className=" flex justify-center  items-center gap-4 px-6 md:px-4 md:py-0 lg:pb-1 lg:px-8">
      <div className="emoji relative text-text-color ">
        <BsFillEmojiSmileFill
          onClick={emojiToggleHandler}
          className="text-2xl text-[#ffde34] cursor-pointer"
        />
        {showEmoji && <EmojiPicker onEmojiClick={emojiClickHandler} />}
      </div>

      <form
        onSubmit={chatHandler}
        className="w-[100%] rounded-2xl h-[40%] md:h-[50%] lg:h-[60%] flex items-center gap-[2rem] bg-[#ffffff21] "
      >
        <input
          className="w-[90%]  placeholder:text-[1rem] h-[60%] bg-transparent text-text-color border-none pl-3 md:pl-4  py-[1.7rem] text-[1.2rem] selection:bg-primary-color-medium focus:outline-none"
          type="text"
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="text-text-color w-32  md:w-28   xs:py-[0.3rem] rounded-[1rem]  flex justify-center items-center bg-primary-color-medium">
          <IoMdSend className="text-[1.7rem] md:text-3xl " />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
