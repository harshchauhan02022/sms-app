import React, { useEffect, useState } from "react";
import "./MainChat.scss";
import axios from "axios";
import moment from 'moment';

const MainChatTwo = () => {
  const [users, setUsers] = useState({});  // Initialize as an empty object
  const [toggleChat, setToggleChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);  // Set initial selectedUser to null
  const [loading, setLoading] = useState(true); // Add loading state

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
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/message/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let newUsers = formatConversations(response.data);
        let firstKey = Object.keys(newUsers)[0];
        setSelectedUser(firstKey ? { key: firstKey, user: newUsers[firstKey] } : null);
        setUsers(newUsers);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching available numbers:", error);
        setLoading(false); // In case of an error, stop showing the loading message
      }
    };

    fetchAvailableNumbers();
  }, []);

  function formatConversations(messages) {
    const conversations = {};

    messages.forEach((message) => {
      const fromNumber = message.from.endpoint;
      const toNumber = message.to;

      const messageType =
        message.direction === "OUTBOUND_API" ? "OUTBOUND" : "INBOUND";

      let conversationKey = fromNumber;
      let conversationWith = toNumber;
      if (message.direction === "INBOUND") {
        conversationKey = toNumber;
        conversationWith = fromNumber;
      }

      if (!conversations[conversationKey]) {
        conversations[conversationKey] = {
          conversationWith,
          messages: [],
        };
      }

      conversations[conversationKey].messages.push({
        type: messageType,
        text: message.body,
        time: moment(message.dateSent).format('DD/MMM/YYYY, hh:mmA'), // Corrected format to 'HH:mm A'
      });
    });
    return conversations;
  }

  // Conditionally render loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
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
                  className={`chatContact ${key === (selectedUser?.key || "") ? "active" : ""}`}
                  onClick={() => handleUserSelect(key, user)}
                >
                  <div className="spcBetween">
                    <div className="flexStart flex-1">
                      <div className="text">
                        <h4 className="mb-0 fxxsm" style={{ fontSize: 16 }}>
                          {key}
                        </h4>
                      </div>
                    </div>
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
                        {/* Profile Picture Placeholder */}
                      </div>
                      <div className="text">
                        <h4 className="mb-0 fxsm">
                          {selectedUser?.user?.conversationWith || "Select a user"}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="conversation">
                  {/* Messages */}
                  {selectedUser?.user?.messages?.map((message, index) => (
                    <div
                      key={index}
                      className={
                        message.type === "INBOUND"
                          ? "receivedMessage"
                          : "sendedMessage"
                      }
                    >
                      <div className="textMessage All-messages">
                        {message.text}
                      </div>
                      <p className="mb-0 mt-1 fxs All-time">{message.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChatTwo;
