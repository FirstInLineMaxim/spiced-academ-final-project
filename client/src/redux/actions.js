import axios from "../axios";

export async function addRecentMessages(data) {
    return {
        type: "GET_MESSAGES",
        messagesList: data,
    };
}

export async function postMessage(newMessage) {
    return {
        type: "POST_MESSAGES",
        message: newMessage,
    };
}

export async function deleteMessage(msgId) {
    console.log(msgId);
    await axios.post("/delete-comment", {
        // action: "DELETE_MESSAGE",
        msgId: msgId,
    });

    return {
        type: "DELETE_MESSAGE",
        msgId: msgId,
    };
}