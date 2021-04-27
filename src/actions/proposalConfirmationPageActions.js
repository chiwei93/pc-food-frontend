import axios from 'axios';
import { toast } from 'react-toastify';

//update proposal
export const updateProposal = (bookingId, history, type) => async dispatch => {
  try {
    //start process
    dispatch({ type: 'START_CANCEL_PROPOSAL_PROCESS' });

    const token = localStorage.getItem('token');

    const accountType = localStorage.getItem('accountType');

    let url;

    if (type === 'cancel') {
      if (accountType === 'user') {
        url = `https://foodapp2021.herokuapp.com/api/v1/bookings/user-cancel/${bookingId}`;
      }
    }

    if (type === 'confirm') {
      url = `https://foodapp2021.herokuapp.com/api/v1/bookings/chef-approve/${bookingId}`;
    }

    if (type === 'complete') {
      url = `https://foodapp2021.herokuapp.com/api/v1/bookings/user-completed/${bookingId}`;
    }

    if (type === 'reject') {
      url = `https://foodapp2021.herokuapp.com/api/v1/bookings/chef-reject/${bookingId}`;
    }

    if (type === 'make payment') {
      url = `https://foodapp2021.herokuapp.com/api/v1/bookings/user-paid/${bookingId}`;
    }

    // update data at api
    await axios.put(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //notify user of successful update
    toast.success('Proposal updated successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    //navigate user to proposals page
    history.push('/proposals');

    //stop process
    dispatch({ type: 'STOP_CANCEL_PROPOSAL_PROCESS' });
  } catch (err) {
    //stop process
    dispatch({ type: 'STOP_CANCEL_PROPOSAL_PROCESS' });

    //notify user of error
    toast.error('An error occurred. Please try again.', {
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
