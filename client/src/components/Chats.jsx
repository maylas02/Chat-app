import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const Chats = ({ socket, email, roomID }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [firstMessageReceived, setFirstMessageReceived] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message !== "") {
      const messageData = {
        room: roomID,
        author: email,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (!firstMessageReceived) {
        setFirstMessageReceived(true);
        setMessageList([data]);
      } else {
        setMessageList((list) => [...list, data]);
      }
      console.log(data);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket, firstMessageReceived]);

  return (
    <div className="border border-gray-300 w-full md:w-1/2 m-auto mt-10 shadow-md rounded-md">
      <div className="bg-gray-50 border-b border-gray-300 p-2">
        <ul className="flex justify-between">
          <li className="text-lg font-medium text-gray-800">Live Chat</li>
          <li>
            <button className="border border-gray-400 rounded-md text-gray-600 py-1 px-2">
              Contact List
            </button>
          </li>
        </ul>
      </div>

      <div className="h-80 overflow-y-auto p-2">
        {messageList.map((messageContent, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col ${
                messageContent.author === email ? "items-end" : "items-start"
              }`}
            >
              <div className="rounded-md py-2 px-4 bg-gray-100 max-w-max">
                <p>{messageContent.message}</p>
              </div>
              <div className="flex justify-around w-36">
                <p className="text-xs text-gray-500">{messageContent.time}</p>
                <p className="text-xs text-gray-500 font-bold">
                  {messageContent.author}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border border-gray-300 p-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-400"
          type="text"
          placeholder="Type your message here"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-1 px-4 ml-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};
