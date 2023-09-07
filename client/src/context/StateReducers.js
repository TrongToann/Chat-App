import { reducerCases } from "./constants";

export const initialState = {
  userInfo: undefined,
  newUser: false,
  contactsPage: false,
  currentChatUser: undefined,
  messages: [],
  socket: undefined,
  userContacts: [],
  onlineUsers: [],
  filteredContacts: [],
  notification: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      console.log({ userInfo: action.userInfo });
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_NEW_USER:
      return {
        ...state,
        newUser: action.newUser,
      };
    case reducerCases.SET_ALL_CONTACTS_PAGE:
      return {
        ...state,
        contactsPage: !state.contactsPage,
      };
    case reducerCases.CHANGE_CURRENT_CHAT_USER:
      return {
        ...state,
        currentChatUser: action.user,
      };
    case reducerCases.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case reducerCases.SET_SOCKET:
      return {
        ...state,
        socket: action.socket,
      };
    case reducerCases.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.newMessage],
      };
    case reducerCases.SET_USER_CONTACTS:
      return {
        ...state,
        userContacts: action.userContacts,
      };
    case reducerCases.SET_ONLINE_USER:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
    case reducerCases.SET_EXIT_CHAT:
      return {
        ...state,
        currentChatUser: undefined,
      };
    case reducerCases.SET_CONTACT_SEARCH: {
      const filteredContacts = state.userContacts.filter((contact) =>
        contact._doc.name
          .toLowerCase()
          .includes(action.contactSearch.toLowerCase())
      );
      return {
        ...state,
        contactSearch: action.contactSearch,
        filteredContacts,
      };
    }
    case reducerCases.SET_NOTIFICATION_CHAT: {
      const indexToMove = state.userContacts.findIndex(
        (obj) => obj._doc._id === action.currentUserChoose
      );
      if (indexToMove !== -1) {
        const user = state.userContacts[indexToMove];
        if (action.inContact === "choose") {
          user.totalUnreadMessages = 0;
          user.messageStatus = "read";
          console.log(state.messages);
        } else if (action.inContact === "add") {
          user.totalUnreadMessages += 1;
          user.message = action.messageNew.message;
          user.createdAt = action.messageNew.createdAt;
          user.messageStatus = action.messageNew.messageStatus;
          user.newSenderId = action.messageNew.senderId;
          if (indexToMove > 0) {
            state.userContacts.splice(indexToMove, 1);
            state.userContacts.splice(0, 0, user);
          }
        } else if (action.inContact === "addTo") {
          user.totalUnreadMessages = 0;
          user.message = action.messageNew.message;
          user.createdAt = action.messageNew.createdAt;
          user.messageStatus = action.messageNew.messageStatus;
          user.newSenderId = action.messageNew.senderId;
          user.messageStatus = "read";
          if (indexToMove > 0) {
            state.userContacts.splice(indexToMove, 1);
            state.userContacts.splice(0, 0, user);
          }
        }
      }
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducer;
