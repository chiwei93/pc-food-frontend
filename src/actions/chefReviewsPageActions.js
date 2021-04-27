import axios from 'axios';

//fetch reviews when the chef reviews page first loads
export const fetchChefReviews = (chefId, history) => async dispatch => {
  try {
    //start loading
    dispatch({ type: 'START_PAGE_LOADING' });

    //fetch all the reviews data
    const reviewsResponse = await axios.get(
      `https://foodapp2021.herokuapp.com/api/v1/reviews/${chefId}`
    );

    const reviews = reviewsResponse.data.chef_reviews;

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

    dispatch({ type: 'FETCH_CHEF_REVIEWS_PAGE_REVIEWS', payload: reviews });

    //stop loading
    dispatch({ type: 'STOP_PAGE_LOADING' });
  } catch (err) {
    dispatch({ type: 'STOP_PAGE_LOADING' });

    //navigate the user to the error page
    history.push('/error');
  }
};
