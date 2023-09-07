import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";

function MessageStatus({ messageStatus }) {
  return (
    <>
      {messageStatus === "sent" && <BsCheck className="text-sm" />}
      {messageStatus === "delivered" && <BsCheckAll className="text-sm" />}
      {messageStatus === "read" && (
        <BsCheckAll className="text-sm text-icon-ack" />
      )}
    </>
  );
}

export default MessageStatus;
