import io from "socket.io-client";
import { postMessage, addRecentMessages } from "./redux/actions";

export let socket;

export const init = store => {
    if(!socket) {
        socket = io.connect();
    }
    //some socket stuff will go here
    //this file will RECEIVE messages from the SERVER
    socket.on("New message and user", (newMessage) => {
        //hand over to redux
        //in other words.. we need to dispach an action
        store.dispatch(postMessage(newMessage));
    });

    socket.on("Most recent messages", (mostRecents) => {
        //this runs when a new user connects (logs in)
        store.dispatch(addRecentMessages(mostRecents));
    });

    // socket.on("Friend request", (notification) => {
    //     alert('teste');
    //     store.dispatch(newFriendRequest(notification));
    // });
};