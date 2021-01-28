import { useSelector, useDispatch } from "react-redux";
import { socket } from "./socket";
import { IoTrashBinOutline, } from "react-icons/io5";
import { deleteMessage } from "./redux/actions";

export default function Chat(props) {
    const dispatch = useDispatch();

    const chatMessages = useSelector((state) => state && state.chatMessages);
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            socket.emit("New message", e.target.value);
            e.target.value = "";
        }
    };

    if (!chatMessages) {
        return null;
    }

    return (
        <div className="chat-page">
            <div className="aside-image">
                <h2>Chatroom etiquette</h2>
                <ol>
                    <li>We are a Hate Free Zone.</li>
                    <li>Be friendly. Be polite. Be considerate.</li>
                    <li>
                        Respect the opinions and practices of others in the
                        room.
                    </li>
                    <li>
                        Limit negative comments as these have a tendency not to
                        help anyone’s world view.
                    </li>
                </ol>
                <img src="../chat.svg" />
            </div>
            <div className="chat-container">
                <div className="messages-container">
                    {chatMessages &&
                        chatMessages.map((msg) => (
                            <div key={msg.id} className="message-container">
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
                                <p>{msg.message}</p>
                                {msg.user_id == props.loggedId && (
                                    <IoTrashBinOutline
                                        className="deleteMsg"
                                        onClick={() =>
                                            dispatch(deleteMessage(msg.id))
                                        }
                                    />
                                )}
                            </div>
                        ))}
                </div>
                <textarea
                    placeholder="Add your message here"
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}
