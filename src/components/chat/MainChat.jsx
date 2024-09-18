import React, { useEffect, useState } from "react";
import "./MainChat.scss";
import axios from "axios";
import moment from 'moment';

const MainChatTwo = () => {
  const [users, setUsers] = useState();
  const [toggleChat, setToggleChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const handleUserSelect = (key, user) => {
    setSelectedUser({
      key,
      user,
    });
    setToggleChat(false);
  };

  useEffect(() => {
    const fetchAvailableNumbers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://192.168.29.20:9090/message/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let newUsers = formatConversations(response.data);
        let firstKey = Object.keys(newUsers)[0];
        setSelectedUser({ key: firstKey, user: newUsers[firstKey] });
        setUsers(newUsers);
      } catch (error) {
        console.error("Error fetching available numbers:", error);
      }
    };

    fetchAvailableNumbers();
  }, []);

  function formatConversations(messages) {
    const conversations = {};

    messages.forEach((message) => {
      const fromNumber = message.from.endpoint;
      const toNumber = message.to;

      // Determine message direction
      const messageType =
        message.direction === "OUTBOUND_API" ? "OUTBOUND" : "INBOUND";

      // Determine the key for this conversation
      let conversationKey = fromNumber;
      let conversationWith = toNumber;
      if (message.direction === "INBOUND") {
        conversationKey = toNumber;
        conversationWith = fromNumber;
      }

      // Initialize conversation if it doesn't exist
      if (!conversations[conversationKey]) {
        conversations[conversationKey] = {
          conversationWith,
          messages: [],
        };
      }

      // Add the message to the conversation
      conversations[conversationKey].messages.push({
        type: messageType,
        text: message.body,
        time: moment(message.dateSent).format('HH:MM:A MM/DD/YYYY'),
      });
    });
    return conversations;
  }

  if (users === null || users === undefined) {
    return <div>LOADING</div>;
  }
  return (
    <div className="row">
      <div className="col-12">
        <div className="shadowBox p-0">
          <div className="chatBox">
            {/* Chat List */}
            <div className={`chatlist ${toggleChat ? "toggleChat" : ""}`}>
              <div className="chatTitle">
                <h2 className="flg">Inbox</h2>
              </div>
              {/* Chat Contacts */}
              {Object.entries(users).map(([key, user]) => (
                <div
                  key={key}
                  className={`chatContact ${
                    key === selectedUser.key ? "active" : ""
                  }`}
                  onClick={() => handleUserSelect(key, user)}
                >
                  <div className="spcBetween">
                    <div className="flexStart flex-1">
                      <div className="text">
                        <h4 className="mb-0 fxxsm" style={{ fontSize: 16 }}>
                          {key}
                        </h4>
                        {/* <p className="mb-0 fxs">{user.lastMessage}</p> */}
                      </div>
                    </div>
                    {/* Conditionally render the message count badge and dot */}
                    {/* {user.unreadMessages > 0 && (
                      <div className="messageCount">{user.unreadMessages}</div>
                    )} */}
                  </div>
                </div>
              ))}
            </div>

            {/* Conversation Box */}
            <div className="converstionBox">
              <div className="realChat">
                <div className="conversationHeader">
                  <div className="spcBetween h-100">
                    <div className="flexStart">
                      <div
                        className="toggleIcon"
                        onClick={() => setToggleChat(!toggleChat)}
                      >
                        <i className="fa-solid fa-mobile-screen-button"></i>
                      </div>
                      <div className="profileBox medium">
                        {/* <img src="../../../../../assets/img/profile.png" alt={`${selectedUser.name}`} /> */}
                      </div>
                      <div className="text">
                        <h4 className="mb-0 fxsm">
                          {selectedUser.user.conversationWith}
                        </h4>
                      </div>
                    </div>
                    {/* <div className="callBox">
                      <div className="calloption">
                        <i className="fa-solid fa-video"></i>
                      </div>
                      <div className="calloption">
                        <i className="fa-solid fa-phone"></i>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="conversation">
                  {/* Messages */}
                  {selectedUser.user.messages.map((message, index) => (
                    <div
                      key={index}
                      className={
                        message.type === "INBOUND"
                          ? "receivedMessage"
                          : "sendedMessage"
                      }
                    >
                      <div className="textMessage">{message.text}</div>
                      <p className="mb-0 mt-1 fxs">{message.time}</p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                {/* <div className="chatFooter">
                  <div className="typeBox">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Write a message..."
                    />
                    <div className="pin">
                      <i className="fa-solid fa-paperclip"></i>
                    </div>
                    <div className="send">
                      <i className="fa-solid fa-paper-plane"></i>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChatTwo;
