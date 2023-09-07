import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACT } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [allContact, setAllContact] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchContact, setSearchContact] = useState([]);
  const [{ userInfo }, dispatch] = useStateProvider();
  useEffect(() => {
    if (searchTerm.length) {
      const filteredData = {};
      Object.keys(allContact).forEach((key) => {
        filteredData[key] = allContact[key].filter((obj) =>
          obj.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setSearchContact(filteredData);
    } else {
      setSearchContact(allContact);
    }
  }, [searchTerm]);
  useEffect(() => {
    const getContacts = async () => {
      try {
        const { data } = await axios.get(GET_ALL_CONTACT);
        setAllContact(data.userGroup);
        setSearchContact(data.userGroup);
      } catch (err) {
        console.log(err);
      }
    };
    getContacts();
  }, []);
  return (
    <div className="h-full flex flex-col ">
      <div className="h-24 flex items-endpx-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() =>
              dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })
            }
          />
          <span>New Chat</span>
        </div>
      </div>
      <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar">
        <div className="flex py-3 items-center gap-3 h-14">
          <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
            <div>
              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-1" />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search or start a new chat"
                className="bg-transparent text-sm focus:outline-none text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        {Object.entries(searchContact).map(([initialLetter, userList]) => {
          return (
            <>
              {userList.filter((user) => user._id !== userInfo.id).length >
                0 && (
                <div key={Date.now() + initialLetter}>
                  <div className="text-teal-light pl-10 py-5">
                    {initialLetter}
                  </div>
                  {userList
                    .filter((user) => user._id !== userInfo.id)
                    .map((contact) => {
                      return (
                        <ChatLIstItem
                          data={contact}
                          isContactsPage={true}
                          key={contact._id}
                        />
                      );
                    })}
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default ContactsList;
