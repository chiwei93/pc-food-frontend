import axios from 'axios';
import { toast } from 'react-toastify';

//fetch menus for proposal questions
export const fetchCategories = (chefId, history) => async dispatch => {
  try {
    //start page loading
    dispatch({ type: 'START_PAGE_LOADING' });

    //fetch data
    const response = await axios.get(
      `http://localhost:7000/api/v1/categories/${chefId}`
    );

    const categoriesData = response.data.categories;
    const categories = categoriesData.map(data => data.category);

    dispatch({ type: 'SET_PROPOSAL_FORM_CATEGORIES', payload: categories });

    //stop page loading
    dispatch({ type: 'STOP_PAGE_LOADING' });
  } catch (err) {
    console.log(err);

    //stop page loading
    dispatch({ type: 'STOP_PAGE_LOADING' });

    //navigate user to error page
    history.push('/error');
  }
};

//make the booking
export const makeProposal = (formValues, chefId, history) => async dispatch => {
  try {
    //start booking
    dispatch({ type: 'START_PROPOSAL_FORM_BOOKING' });

    //get token
    const token = localStorage.getItem('token');

    const response = await axios.post(
      `http://localhost:7000/api/v1/bookings/chefs/${chefId}`,
      formValues,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //finish booking
    dispatch({ type: 'STOP_PROPOSAL_FORM_BOOKING' });

    //navigate the user to the confirmation page
    history.push(`/proposals/${response.data.booking._id}`);
  } catch (err) {
    console.log(err);

    //stop booking
    dispatch({ type: 'STOP_PROPOSAL_FORM_BOOKING' });

    //notify the user
    toast.error('An error occured while making the booking', {
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
