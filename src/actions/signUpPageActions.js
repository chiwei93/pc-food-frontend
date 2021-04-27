import axios from 'axios';
import { toast } from 'react-toastify';

//for handling radio btn click
export const onRadioBtnClick = value => {
  return { type: 'SET_ACCOUNT_TYPE', payload: value };
};

//for signing up users
export const postSignUpData = (
  formValues,
  accountType,
  history
) => async dispatch => {
  try {
    //start page loading
    dispatch({ type: 'START_PAGE_LOADING' });

    let url;

    if (accountType === 'user') {
      url = 'https://foodapp2021.herokuapp.com/api/v1/users/new';
    } else {
      url = 'https://foodapp2021.herokuapp.com/api/v1/chefs/new';
    }

    const form = { ...formValues };
    form.profileImage = `https://pc-food-bucket.s3.ap-southeast-1.amazonaws.com/1619099339372`;

    //sign up user
    const response = await axios.post(url, form);

    //for chat
    await axios.post(`https://pc-food-chat.herokuapp.com/api/v1/users`, {
      name: response.data[0].user.username,
      email: response.data[0].user.email,
    });

    //save to localStorage
    localStorage.setItem('token', response.data[0].auth_token);
    localStorage.setItem('accountType', accountType);

    dispatch({ type: 'SIGNED_IN' });

    if (accountType === 'user') {
      localStorage.setItem('email', response.data[0].user.email);
      history.push('/me');
    } else {
      localStorage.setItem('email', response.data[0].user.email);
      localStorage.setItem('chefId', response.data[0].user.id);
      history.push(`/signup/categories/${response.data[0].user.id}`);
    }

    //stop page loading
    dispatch({ type: 'STOP_PAGE_LOADING' });
  } catch (err) {
    //stop page loading
    dispatch({ type: 'STOP_PAGE_LOADING' });

    //handle error using toast
    toast.error(err.response.data.message, {
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
