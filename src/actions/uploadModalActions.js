import axios from 'axios';
import { toast } from 'react-toastify';

//uploading image to cloud
export const uploadImage = (
  formData,
  uploadType,
  history,
  id
) => async dispatch => {
  try {
    dispatch({ type: 'START_UPLOADING' });

    //get token from local storage
    const token = localStorage.getItem('token');

    let url;

    if (uploadType === 'menuImages') {
      url = `https://foodapp2021.herokuapp.com/api/v1/menu_images/update/${id}`;
    }

    if (uploadType === 'chefProfileImage') {
      url = `https://foodapp2021.herokuapp.com/api/v1/chefs/image`;
    }

    if (uploadType === 'userProfileImage') {
      url = `https://foodapp2021.herokuapp.com/api/v1/users/image`;
    }

    await axios.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'STOP_UPLOADING' });

    //reset back to null
    dispatch({ type: 'SET_PREVIEW_IMAGE', payload: null });
    dispatch({ type: 'SET_IMAGE_FILE', payload: null });

    toast.success('Image uploaded successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    //go back to the last page
    history.goBack();
  } catch (err) {
    dispatch({ type: 'STOP_UPLOADING' });

    //notify user of the error
    toast.error('An error occurred while uploading image', {
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
