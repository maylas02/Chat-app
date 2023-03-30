import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chats } from "./Chats";

export const Login = ({ socket }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roomID, setRoomID] = useState("");
  const [showChat, setShowChat] = useState(false);

  const login = (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("Please complete the details.");
      return;
    } else {
      socket.emit("join_room", roomID);
      setShowChat(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {!showChat ? (
        <form className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl text-center font-bold mb-4">Login</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <input
              className="border border-gray-400 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              className="border border-gray-400 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="room_Id" className="block font-bold mb-2">
              Create Room ID
            </label>
            <input
              className="border border-gray-400 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
              onClick={login}
            >
              Login
            </button>
          </div>
        </form>
      ) : (
        <Chats socket={socket} email={email} roomID={roomID} />
      )}
    </div>
  );
};
