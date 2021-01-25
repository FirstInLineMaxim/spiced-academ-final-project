import { useSelector, useDispatch } from "react-redux";
import { socket } from './socket';
import { useEffect, useState } from "react";
import { FaArrowCircleUp, FaTrashAlt} from "react-icons/fa";
import {  deleteMessage } from "./redux/actions";

export default function Chat(props) {
    const dispatch = useDispatch();
    const [showScroll, setShowScroll] = useState(false);
    //1. retrieve chat messages from Redux and render them
    const chatMessages = useSelector((state) => state && state.chatMessages);
    //2. post new messages
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            //send message off to server using sockets instead of axios
            //socket.emit will send a message to the server
            socket.emit("New message", e.target.value);
            e.target.value = '';
        }
    };

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 100) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 100) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", checkScrollTop);

    if (!chatMessages) {
        return null;
    }

    return (
        <>
            <h1>Welcome to chatroom</h1>
            <div id="chat-container">
                <div className='messages-container'>
                    {chatMessages &&
                        chatMessages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className="message-container">
                                <img
                                    className="profile-img"
                                    src={
                                        msg["profile_pic"] ||
                                        "../default-img.png"
                                    }
                                    alt={`${msg["full_name"]}`}
                                />
                                <p className="user">
                                    {`${msg["full_name"]} `}
                                    <span className="timestamp">
                                        {msg["create_at"]}
                                    </span>
                                </p>
                                <p>
                                    {msg.message}
                                </p>
                                {msg.user_id == props.loggedId && (
                                    <FaTrashAlt
                                        className='deleteMsg'
                                        onClick={() =>
                                            dispatch(deleteMessage(msg.id))
                                        }
                                    />
                                )}
                            </div>
                        ))}
                </div>
                <textarea onKeyDown={handleKeyDown} />
                <FaArrowCircleUp
                    className="scrollTop"
                    onClick={scrollTop}
                    style={{
                        height: 40,
                        display: showScroll ? "flex" : "none",
                    }}
                />
            </div>
        </>
    );
}