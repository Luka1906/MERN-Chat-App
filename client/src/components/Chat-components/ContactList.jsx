import { useEffect, useState } from "react";
import Logo from "../Form-components/Logo";

const ContactList = ({
  contacts,
  currentUser,
  changeChat,
  chatVisibility,
  setChatVisible,
}) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changedChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div
          className={`${
            chatVisibility ? "hidden" : "grid"
          } md:grid gap-2 grid-rows-contact-grid  overflow-hidden opacity-95 bg-primary-color-dark shadow-inner-shadow`}
        >
          <div className="flex items-center justify-center ">
            <Logo />
          </div>
          <div  className=" contacts flex flex-col   items-center overflow-auto  gap-3">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected-contact" : ""
                  } bg-slate-200 min-h-[5rem] w-[75%] lg:w-[90%]  cursor-pointer rounded-md p-2 flex items-center gap-4 transition duration-200 ease-in-out`}
                  key={index}
                  onMouseDown={() => changedChat(index, contact)}
                  onClick={setChatVisible} 
              
                >
                  <div>
                    <img
                      className="h-12"
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <h3 className="text-md">{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-message-color flex  justify-center py-10 items-center  text mb-2 gap-4">
            <div className="avatar">
              <img
                className="h-16 "
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="md:gap-2 md:text-[1rem] text-text-color font-medium text-lg md:text-xl">
              <h3>{currentUserName}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactList;
