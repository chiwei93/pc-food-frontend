import axios from 'axios';
import { toast } from 'react-toastify';

//fetching chef's data and his or her menus' details when the page is visited
export const fetchChefData = (id, history) => async dispatch => {
  try {
    //start loading
    dispatch({ type: 'START_PAGE_LOADING' });

    //fetch all the data for the menus
    const responses = await Promise.all([
      axios.get(`https://foodapp2021.herokuapp.com/api/v1/chefs/${id}`),
      axios.get(`https://foodapp2021.herokuapp.com/api/v1/menus/chef/${id}`),
      axios.get(
        `https://foodapp2021.herokuapp.com/api/v1/food_categories/${id}`
      ),
    ]);

    const datas = responses.map(res => res.data);

    //chef
    const chef = datas[0].chef_profile;

    //menu
    const menus = datas[1].results;

    //category
    const { food_category } = datas[2];

    chef.categories = food_category;

    const menuImagesPromises = menus.map(menu =>
      axios.get(
        `https://foodapp2021.herokuapp.com/api/v1/menu_images/${menu.menu_id}`
      )
    );

    const menuImagesResponses = await Promise.all(menuImagesPromises);

    const menuImagesData = menuImagesResponses.map(res => res.data);
    const menuImages = menuImagesData.map(arr => {
      return arr.map(el => el.image_path);
    });

    menus.forEach((menu, index) => {
      menu.images = menuImages[index];
    });

    dispatch({ type: 'SET_CHEF_DETAIL_PAGE_CHEF', payload: chef });
    dispatch({ type: 'SET_CHEF_DETAIL_PAGE_MENUS', payload: menus });
    dispatch({ type: 'SET_CHEF_DETAIL_PAGE_ACTIVE_MENU', payload: 0 });

    //stop loading
    dispatch({ type: 'STOP_PAGE_LOADING' });
  } catch (err) {
    //handle error
    console.log(err);
    dispatch({ type: 'STOP_PAGE_LOADING' });

    //navigate the user to the error page
    history.push('/error');
  }
};

//for handling tab btns clicks
export const onTabBtnClick = (tab, id) => async dispatch => {
  try {
    //set the active section
    dispatch({ type: 'SET_CHEF_DETAIL_PAGE_ACTIVE_SECTION', payload: tab });

    //if the reviews tab is clicked
    if (tab === 'reviews') {
      //start reviews loading
      dispatch({ type: 'START_CHEF_DETAIL_REVIEWS_LOADING' });

      //fetch reviews for chef
      const response = await axios.get(
        `https://foodapp2021.herokuapp.com/api/v1/reviews/${id}`
      );

      const reviews = response.data.chef_reviews || response.data;

      const userPromises = reviews.map(review =>
        axios.get(
          `https://foodapp2021.herokuapp.com/api/v1/users/${review.user_id}`
        )
      );

      const userResponses = await Promise.all(userPromises);
      const userDatas = userResponses.map(res => res.data);

      reviews.forEach((review, index) => {
        review.user = userDatas[index];
      });

      dispatch({ type: 'SET_CHEF_DETAIL_PAGE_REVIEWS', payload: reviews });

      //stop the review loading
      dispatch({ type: 'STOP_CHEF_DETAIL_REVIEWS_LOADING' });
    }
  } catch (err) {
    //handle errors

    dispatch({ type: 'STOP_CHEF_DETAIL_REVIEWS_LOADING' });

    //notify the user of the error
    toast.error('The reviews failed to load!', {
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

//handling when the select btn is clicked
export const onBtnSelectChange = index => {
  return { type: 'SET_CHEF_DETAIL_PAGE_ACTIVE_MENU', payload: index };
};
