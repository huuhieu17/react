import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const Chat = () => {
  const [number, setNumber] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("")
  const socket = io("http://localhost:4000");

  useEffect(() => {
    if(socket){
        // socket.on("connect", () => {

        // })
       
        socket.on("new value", msg => {
            setNumber(msg)
        })
        socket.on("return new message", msg => {
            setMessages(pre => ([...pre, msg]))
        })
    }
  },[socket])
  return (
    <div>
      <div>Giá trị: {number}</div>
      <button
        onClick={() => {
          if (socket) {
            socket.emit("increase", number + 1);
          }
        }}
      >
        Increase
      </button>
      <hr></hr>
      <div>
        <input
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
        />
        <button onClick={() => {
            if(socket){
                socket.emit("send message", inputMessage);
            }
        }}>Gửi</button>
      </div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
}

export default Chat