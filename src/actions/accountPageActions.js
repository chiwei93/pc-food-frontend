import axios from 'axios';
import { toast } from 'react-toastify';

//handle upload btn click
export const onUploadBtnClick = accountType => {
  let payload;

  if (accountType === 'chef') {
    payload = 'chefProfileImage';
  } else {
    payload = 'userProfileImage';
  }

  return { type: 'SET_UPLOAD_MODAL_TYPE', payload };
};

//fetch data on inital render of page
export const fetchUserData = history => async dispatch => {
  try {
    //start page loading
    dispatch({ type: 'START_PAGE_LOADING' });

    const token = localStorage.getItem('token');
    const accountType = localStorage.getItem('accountType');

    let url;

    if (accountType === 'chef') {
      url = 'https://foodapp2021.herokuapp.com/api/v1/chefs/me';
    } else {
      url = 'https://foodapp2021.herokuapp.com/api/v1/users/me';
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const activeAccount = response.data;

    //set the current user
    dispatch({
      type: 'SET_ACCOUNT_PAGE_ACTIVE_ACCOUNT',
      payload: activeAccount,
    });

    //stop page loading
    dispatch({ type: 'STOP_PAGE_LOADING' });
  } catch (err) {
    //stop page loading
    dispatch({ type: 'STOP_PAGE_LOADING' });

    //navigate the user to the error page
    history.push('/error');
  }
};

//handling updating user account info
export const updateAccountInfo = (
  formValues,
  accountType
) => async dispatch => {
  try {
    dispatch({ type: 'START_ACCOUNT_PAGE_UPDATE' });

    const token = localStorage.getItem('token');

    let url;

    if (accountType === 'chef') {
      url = 'https://foodapp2021.herokuapp.com/api/v1/chefs/update';
    } else {
      url = 'https://foodapp2021.herokuapp.com/api/v1/users/update';
    }

    const form = { username: formValues.name, email: formValues.email };

    await axios.put(url, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //notify the user that the details have been updated
    toast.success('Account Details updated successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    dispatch({ type: 'STOP_ACCOUNT_PAGE_UPDATE' });
  } catch (err) {
    //stop page loading
    dispatch({ type: 'STOP_ACCOUNT_PAGE_UPDATE' });

    //notify the user that the details failed to update
    toast.error('Account Details failed to update', {
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
