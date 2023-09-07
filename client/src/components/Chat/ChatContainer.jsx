import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useRef } from "react";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";

function ChatContainer() {
  const [{ messages, currentChatUser, userInfo }] = useStateProvider();
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0 top-0 z-0"></div>
      <div className="mx-10 my-6 relative bottom-0 z-40 left-0">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {messages.map((message, index) => (
              <div
                key={message._id}
                className={`flex ${
                  message.senderId === currentChatUser._id
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {message.type === "text" && (
                  <div
                    className={`text-white px-2 py-2 text-sm rounded-md gap-2 items-end max-w-[50%] ${
                      message.senderId === currentChatUser._id
                        ? "bg-incoming-background"
                        : "bg-outgoing-background"
                    } `}
                  >
                    <span
                      className={`break-all flex text-[15px]  ${
                        message.senderId === currentChatUser._id
                          ? "justify-start pr-5"
                          : "justify-end pl-5"
                      }`}
                    >
                      {message.message}
                    </span>
                    <div
                      className={`flex gap-1 ${
                        message.senderId === currentChatUser._id
                          ? "items-end justify-start pr-5"
                          : "items-end justify-end pl-5"
                      }`}
                    >
                      <span className="text-bubble-meta text-[10px] pt-1 min-w-fit ">
                        {calculateTime(message.createdAt)}
                      </span>
                      <span>
                        {message.senderId === userInfo.id && (
                          <MessageStatus
                            messageStatus={message.messageStatus}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                )}
                {message.type === "image" && <ImageMessage message={message} />}
                <div ref={scroll}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
