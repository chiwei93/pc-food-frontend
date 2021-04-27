import axios from 'axios';
import { toast } from 'react-toastify';

//fetch initial page information
export const fetchInitialData = () => async dispatch => {
  try {
    //load page
    dispatch({ type: 'START_PAGE_LOADING' });

    //fetch relevant chefs' data
    const response = await axios.get(
      `https://foodapp2021.herokuapp.com/api/v1/chefs/`
    );

    let chefs;

    if (response.data.message === 'There are no chefs created yet') {
      chefs = [];
    }

    chefs = response.data.results;

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

    //set chef cards
    dispatch({ type: 'FETCH_HOMEPAGE_CHEFS', payload: chefs });

    //stop loading
    dispatch({ type: 'STOP_PAGE_LOADING' });
  } catch (err) {
    //stop loading
    dispatch({ type: 'STOP_PAGE_LOADING' });

    //notify the user of the error
    toast.error("Failed to fetch the chefs' data", {
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

//fetch chef data when the category btn is clicked
export const onCategoryBtnClick = category => async dispatch => {
  try {
    dispatch({ type: 'SET_ACTIVE_HOMEPAGE_CATEGORY', payload: category });
    dispatch({ type: 'START_CARDS_LOADING' });

    //fetch chef data
    let chefs;

    if (category === 'recommended') {
      const response = await axios.get(
        `https://foodapp2021.herokuapp.com/api/v1/chefs/`
      );

      chefs = [...response.data.results];
    } else {
      const chefIdResponse = await axios.get(
        `https://foodapp2021.herokuapp.com/api/v1/food_categories?category=${category}`
      );

      const chefsPromise = chefIdResponse.data.map(chef =>
        axios.get(
          `https://foodapp2021.herokuapp.com/api/v1/chefs/${chef.chef_id}`
        )
      );

      const chefsResponse = await Promise.all(chefsPromise);

      chefs = chefsResponse.map(
        res => res.data.chef_profile || res.data.chef_id
      );
    }

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

    dispatch({ type: 'FETCH_HOMEPAGE_CHEFS', payload: chefs });
    dispatch({ type: 'STOP_CARDS_LOADING' });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'STOP_CARDS_LOADING' });

    //notify the user of the error
    toast.error("Failed to fetch the chefs' data", {
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

//handling search input
export const onSearchInputChange = term => {
  return { type: 'HOMEPAGE_SEARCH_INPUT_CHANGE', payload: term };
};
