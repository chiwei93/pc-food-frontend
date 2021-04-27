import axios from 'axios';
import { toast } from 'react-toastify';

//change the active section whenever the tab btn is clicked
export const onTabBtnClick = tab => {
  return { type: 'SWITCH_PROPOSALS_PAGE_ACTIVE_SECTION', payload: tab };
};

//fetch proposals
export const fetchProposals = (
  accountType,
  activeSection
) => async dispatch => {
  try {
    //start loading
    dispatch({ type: 'START_PROPOSALS_PAGE_ITEMS_LOADING' });

    //get token from local storage
    const token = localStorage.getItem('token');

    let url;

    if (accountType === 'chef') {
      url = `https://foodapp2021.herokuapp.com/api/v1/bookings/chef`;
    } else {
      url = `https://foodapp2021.herokuapp.com/api/v1/bookings/user`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const bookings = response.data.results;

    let bookingsDisplayed;

    //filter the booking into confirmed bookings and not confirmed bookings
    if (activeSection === 'confirmed proposals') {
      bookingsDisplayed = bookings.filter(
        booking => booking.confirmed === true && booking.active === true
      );
    } else {
      bookingsDisplayed = bookings.filter(
        booking => booking.confirmed === false && booking.active === true
      );
    }

    let promises;

    //show user when chef account and chef when user account
    if (accountType === 'chef') {
      promises = bookingsDisplayed.map(booking =>
        axios.get(
          `https://foodapp2021.herokuapp.com/api/v1/users/${booking.user}`
        )
      );
    } else {
      promises = bookingsDisplayed.map(booking =>
        axios.get(
          `https://foodapp2021.herokuapp.com/api/v1/chefs/${booking.chef}`
        )
      );
    }

    const promiseRes = await Promise.all(promises);

    const datas = promiseRes.map(res => {
      return res.data.chef_profile || res.data;
    });

    bookingsDisplayed.forEach((booking, index) => {
      booking.account = datas[index];
    });

    console.log(bookingsDisplayed);

    dispatch({
      type: 'SET_PROPOSALS_PAGE_PROPOSALS',
      payload: bookingsDisplayed,
    });

    //stop loading
    dispatch({ type: 'STOP_PROPOSALS_PAGE_ITEMS_LOADING' });
  } catch (err) {
    //stop loading
    dispatch({ type: 'STOP_PROPOSALS_PAGE_ITEMS_LOADING' });

    //notify the user of the error
    toast.error("An error occurred while getting proposals' data", {
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
