import { API_BASE_URL } from "../api";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Chat() {

  const navigate = useNavigate();

  const studentName = localStorage.getItem("chatStudent");
  const mentorName = localStorage.getItem("chatMentor");
  const sender = localStorage.getItem("role");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const loadMessages = useCallback(() => {

    fetch(`${API_BASE_URL}/chat/${studentName}/${mentorName}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.log(err));

  }, [studentName, mentorName]);

  useEffect(() => {

    loadMessages();

    const interval = setInterval(() => {
      loadMessages();
    }, 2000);

    return () => clearInterval(interval);

  }, [loadMessages]);

  const sendMessage = () => {

    if (message.trim() === "") return;

    fetch(`${API_BASE_URL}/chat/send`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        studentName,
        mentorName,
        sender,
        message,

      }),

    })
      .then(() => {

        setMessage("");
        loadMessages();

      });

  };

  return (

    <div
      style={{
        width: "70%",
        margin: "20px auto",
        fontFamily: "Arial"
      }}
    >

      <h2 style={{ textAlign: "center" }}>
        💬 Chat with {sender === "student" ? mentorName : studentName}
      </h2>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          height: "450px",
          overflowY: "auto",
          padding: "15px",
          backgroundColor: "#f5f5f5"
        }}
      >

        {messages.map((msg) => (

          <div
            key={msg.id}
            style={{
              textAlign: msg.sender === sender ? "right" : "left",
              marginBottom: "15px"
            }}
          >

            <div
              style={{
                display: "inline-block",
                backgroundColor:
                  msg.sender === sender
                    ? "#DCF8C6"
                    : "#FFFFFF",
                padding: "10px 15px",
                borderRadius: "15px",
                maxWidth: "70%",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
              }}
            >

              <b>{msg.sender}</b>

              <br />

              {msg.message}

            </div>

          </div>

        ))}

      </div>

      <br />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >

        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          style={{
            width: "82%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid gray"
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            width: "15%",
            backgroundColor: "#003366",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Send
        </button>

      </div>

      <br />

      <div style={{ textAlign: "center" }}>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Back to Dashboard
        </button>

      </div>

    </div>

  );

}

export default Chat;
