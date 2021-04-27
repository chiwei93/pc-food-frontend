import axios from 'axios';
import { toast } from 'react-toastify';

//handling clicking the radio btn
export const onRadioBtnClick = value => {
  return { type: 'SET_ACCOUNT_TYPE', payload: value };
};

//logging user in
export const postLoginData = (
  formValues,
  accountType,
  history
) => async dispatch => {
  try {
    //start page loading
    dispatch({ type: 'START_PAGE_LOADING' });

    //decide the url
    let url;

    if (accountType === 'user') {
      url = `https://foodapp2021.herokuapp.com/api/v1/users/login`;
    } else {
      url = 'https://foodapp2021.herokuapp.com/api/v1/chefs/login';
    }

    const response = await axios.post(url, formValues);

    //set the relevant info into local storage
    localStorage.setItem('token', response.data.auth_token);
    localStorage.setItem('accountType', accountType);
    dispatch({ type: 'SIGNED_IN' });

    if (accountType === 'user') {
      localStorage.setItem('email', response.data.user.email);
    } else {
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('chefId', response.data.user.id);
    }

    //navigate to the user's account page
    history.push('/me');

    //notify the user using toast
    toast.success('You have logged in successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    //stop page loading
    dispatch({ type: 'STOP_PAGE_LOADING' });
  } catch (err) {
    dispatch({ type: 'STOP_PAGE_LOADING' });

    //handle error using toast
    toast.error('An error occurred while logging user in. Please try again.', {
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
