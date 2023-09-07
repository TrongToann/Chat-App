import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import { FaCamera } from "react-icons/fa";

function ChatLIstItem({
  data,
  recieverId,
  senderId,
  isContactsPage = false,
  totalUnreadMessages,
  messages,
  createAt,
  messageStatus,
  newSenderId,
}) {
  const [{ userInfo, onlineUsers, currentChatUser }, dispatch] =
    useStateProvider();
  const handleContactClick = () => {
    dispatch({
      type: reducerCases.SET_NOTIFICATION_CHAT,
      currentUserChoose: data._id,
      inContact: "choose",
    });
    if (!isContactsPage) {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: {
          name: data.name,
          about: data.about,
          profilePicture: data.profilePicture,
          email: data.email,
          _id: userInfo.id === senderId ? recieverId : senderId,
        },
      });
    } else {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: { ...data },
      });
      dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
    }
  };
  return (
    <div
      className={`flex cursor-pointer items-center hover:bg-background-default-hover`}
      onClick={handleContactClick}
    >
      <div className="min-w-fit px-5 pt-3 pb-1 relative">
        <Avatar type="lg" image={data?.profilePicture} />
        {onlineUsers?.includes(data?._id) ? (
          <div className="absolute bg-icon-green px-2 py-2 rounded-full text-sm left-16 top-3 "></div>
        ) : (
          <></>
        )}
      </div>
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full ">
        <div className="flex justify-between">
          {isContactsPage && <span className="text-white">{data?.name}</span>}
          {!isContactsPage && (
            <>
              <div>
                <div>
                  <span className="text-white">{data?.name}</span>
                </div>
                <div className="whitespace-nowrap text-ellipsis overflow-hidden max-w-xs">
                  <span
                    className={`text-sm px-1 ${
                      messageStatus === "read" || newSenderId === userInfo.id
                        ? "text-secondary"
                        : "text-white font-bold"
                    } `}
                  >
                    {messages || "Click To Chat"}
                  </span>
                </div>
              </div>
              <div>
                <span
                  className={`${
                    !totalUnreadMessages > 0
                      ? "text-secondary"
                      : "text-icon-green"
                  } text-sm`}
                >
                  {calculateTime(createAt)}
                </span>
                <div className="flex justify-end">
                  {totalUnreadMessages > 0 &&
                    data?._id !== currentChatUser?._id && (
                      <span className="bg-icon-green px-[5px] rounded-full text-sm ">
                        {totalUnreadMessages}
                      </span>
                    )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex border-b border-conversation-border pb-2 pt-1 pr-2">
          <div className="flex justify-between w-full">
            <span className="text-secondary line-clamp-1 text-sm">
              {isContactsPage ? (
                data?.about || "\u00A0"
              ) : (
                <div
                  className="flex items-center gap-1 max-w[200px]
              sm:max-w-[250px] md:max-w-[300px] lg:max-w-[200px]
              xl:max-w-[300px]"
                >
                  {senderId === userInfo.id && (
                    <MessageStatus messageStatus={data.messageStatus} />
                  )}
                  {data.type === "text" && (
                    <span className="truncate">{data.message}</span>
                  )}
                  {data.type === "image" && (
                    <span className="flex gap-1 items-center">
                      <FaCamera className="text-panel-header-icon" />
                    </span>
                  )}
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatLIstItem;
