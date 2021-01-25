export default function reducer(state = {}, action ) { 

    if (action.type == "GET_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.messagesList,
        };
    }

    if (action.type == "POST_MESSAGES") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.message],
        };
    }

    if (action.type == "DELETE_MESSAGE") {
        console.log('actino', action);
        state = {
            ...state,
            chatMessages: state.chatMessages.filter((deletedMsg) => {
                return deletedMsg.id != action.msgId;
            }),
        };
    }

    return state;
}