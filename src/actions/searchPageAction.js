import axios from 'axios';
import { toast } from 'react-toastify';

//for search input
export const onSearchPageInputChange = term => {
  return { type: 'SEARCH_PAGE_INPUT_CHANGE', payload: term };
};

//fetch chefs data
export const fetchSearchData = term => async dispatch => {
  try {
    dispatch({ type: 'SET_SEARCH_PAGE_CHEF_CARDS', payload: [] });

    //start loading
    dispatch({ type: 'START_SEARCH_PAGE_CARD_LOADING' });

    //prevent internal server error
    if (!term) {
      return;
    }

    //fetch data
    const chefIdResponse = await axios.get(
      `https://foodapp2021.herokuapp.com/api/v1/food_categories?category=${term}`
    );

    const chefsPromise = chefIdResponse.data.map(chef =>
      axios.get(
        `https://foodapp2021.herokuapp.com/api/v1/chefs/${chef.chef_id}`
      )
    );

    const chefsResponse = await Promise.all(chefsPromise);

    const chefs = chefsResponse.map(
      res => res.data.chef_profile || res.data.chef_id
    );

    const categoriesPromises = chefs.map(chef =>
      axios.get(
        `https://foodapp2021.herokuapp.com/api/v1/food_categories/${chef._id}`
      )
    );

    const likePromises = chefs.map(chef =>
      axios.get(`https://foodapp2021.herokuapp.com/api/v1/likes/${chef._id}`)
    );

    const categoriesRes = await Promise.all(categoriesPromises);
    const likesRes = await Promise.all(likePromises);

    const categoriesData = categoriesRes.map(res => res.data.food_category);
    const likesData = likesRes.map(res => res.data.no_of_likes);

    chefs.forEach((chef, index) => {
      chef.categories = categoriesData[index];
      chef.likes = likesData[index];
    });

    dispatch({ type: 'SET_SEARCH_PAGE_CHEF_CARDS', payload: chefs });

    //stop loading
    setTimeout(() => dispatch({ type: 'STOP_SEARCH_PAGE_CARD_LOADING' }), 300);
  } catch (err) {
    //stop loading
    dispatch({ type: 'STOP_SEARCH_PAGE_CARD_LOADING' });

    //notify user of the error
    toast.error("An error occurred while fetching chefs' data", {
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
