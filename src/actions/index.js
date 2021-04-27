import axios from 'axios';
import socket from '../utils/socket';
import { toast } from 'react-toastify';

export const toggleEmojiPicker = () => {
  return { type: 'TOGGLE_EMOJI_PICKER' };
};

//fetch single chat data
export const fetchSingleChatData = (
  currentUserEmail,
  receiverEmail
) => async dispatch => {
  try {
    dispatch({ type: 'START_PAGE_LOADING' });

    socket.emit('startChat', currentUserEmail, receiverEmail);

    socket.on('sendRoomID', roomID => {
      localStorage.setItem('roomID', roomID);
    });

    const response = await axios.get(
      `https://pc-food-chat.herokuapp.com/api/v1/users/${receiverEmail}`
    );

    const { name } = response.data.user;

    dispatch({ type: 'SET_RECEIVER_NAME', payload: name });

    socket.on('loadMessages', messages => {
      dispatch({ type: 'FETCH_MESSAGES', payload: messages });
      dispatch({ type: 'STOP_PAGE_LOADING' });
    });
  } catch (err) {
    console.log(err);

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

export const onMessageInputChange = message => {
  return { type: 'INPUT_MESSAGE_CHANGE', payload: message };
};

export const insertMessage = message => {
  return { type: 'INSERT_MESSAGE', payload: message };
};
