import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function ChatHeader() {
  const [{ currentChatUser, onlineUsers }, dispatch] = useStateProvider();
  const showContexMenu = (e) => {
    dispatch({ type: reducerCases.SET_EXIT_CHAT });
  };
  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background  z-10">
      <div className="flex items-center justify-center gap-6">
        <Avatar type="sm" image={currentChatUser?.profilePicture} />
        <div className="flex flex-col">
          <span className="text-primary-strong">{currentChatUser?.name}</span>
          <span
            className={`text-sm ${
              onlineUsers.includes(currentChatUser._id)
                ? "text-icon-green"
                : "text-secondary"
            }  `}
          >
            {onlineUsers.includes(currentChatUser._id) ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall className="text-panel-header-icon cursor-pointer text-xl" />
        <IoVideocam className="text-panel-header-icon cursor-pointer text-xl" />
        <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl" />
        <AiOutlineCloseSquare
          className="text-panel-header-icon cursor-pointer text-xl"
          onClick={(e) => showContexMenu(e)}
          id="context-opener"
        />
      </div>
    </div>
  );
}

export default ChatHeader;