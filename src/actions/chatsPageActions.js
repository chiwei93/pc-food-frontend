import axios from 'axios';
import { toast } from 'react-toastify';

//fetching chats
export const fetchChatsData = email => async dispatch => {
  try {
    dispatch({ type: 'START_PAGE_LOADING' });

    const response = await axios.get(
      `https://pc-food-chat.herokuapp.com/api/v1/chats?email=${email}`
    );

    const { chats } = response.data;

    const roomIDs = chats.map(chat => chat.roomID);

    const emails = chats.map(chat => {
      if (chat.senderEmail === email) {
        return chat.receiverEmail;
      } else {
        return chat.senderEmail;
      }
    });

    const messagesResponses = await Promise.all(
      roomIDs.map(id =>
        axios.get(
          `https://pc-food-chat.herokuapp.com/api/v1/messages?roomID=${id}`
        )
      )
    );

    const namesResponses = await Promise.all(
      emails.map(el =>
        axios.get(`https://pc-food-chat.herokuapp.com/api/v1/users/${el}`)
      )
    );

    const messages = messagesResponses.map(
      res => res.data.messages[res.data.messages.length - 1]
    );

    const names = namesResponses.map(res => res.data.user.name);

    chats.forEach((chat, index) => {
      chat.receiverName = names[index];

      if (messages[index]) {
        chat.lastMessage = messages[index].message;
        chat.lastMessageDate = messages[index].createdAt;
      }
    });

    dispatch({ type: 'SET_CHATS', payload: chats });
    dispatch({ type: 'STOP_PAGE_LOADING' });
  } catch (err) {
    //error handling

    dispatch({ type: 'STOP_PAGE_LOADING' });

    toast.error('Failed to fetch messages!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
