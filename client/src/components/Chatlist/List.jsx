import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_INITIAL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect } from "react";
import ChatLIstItem from "./ChatLIstItem";

function List() {
  const [{ userInfo, userContacts, filteredContacts }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users, onlineUsers },
        } = await axios.post(`${GET_INITIAL_CONTACTS}/${userInfo.id}`);
        dispatch({ type: reducerCases.SET_ONLINE_USER, onlineUsers });
        dispatch({ type: reducerCases.SET_USER_CONTACTS, userContacts: users });
      } catch (err) {
        console.log(err);
      }
    };
    if (userInfo?.id) {
      getContacts();
    }
  }, [userInfo]);
  return (
    <div className="bg-search-input-container-background flex-auto overflow-auto max-h-full custom-scrollbar">
      {filteredContacts && filteredContacts.length > 0
        ? filteredContacts.map((contact) => (
            <div key={contact._id}>
              <ChatLIstItem
                createAt={contact.createdAt}
                data={contact._doc}
                recieverId={contact.recieverId._id}
                senderId={contact.senderId._id}
                key={contact._id}
                totalUnreadMessages={contact.totalUnreadMessages}
                messages={contact.message}
              />
            </div>
          ))
        : userContacts.map((contact) => (
            <div key={contact._id}>
              <ChatLIstItem
                createAt={contact.createdAt}
                data={contact._doc}
                recieverId={contact.recieverId._id}
                senderId={contact.senderId._id}
                key={contact._id}
                totalUnreadMessages={contact.totalUnreadMessages}
                messages={contact.message}
                messageStatus={contact.messageStatus}
                newSenderId={contact.newSenderId}
              />
            </div>
          ))}
    </div>
  );
}

export default List;
