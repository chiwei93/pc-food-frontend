import axios from 'axios';

//setting error
export const setPageError = () => {
  return { type: 'SET_SIGNUP_CATEGORIES_PAGE_ERROR' };
};

//set no error
export const stopPageError = () => {
  return { type: 'SET_SIGNUP_CATEGORIES_PAGE_NO_ERROR' };
};

//create default menus
export const postCategoriesData = (
  formValues,
  history,
  chefId
) => async dispatch => {
  try {
    //start loading
    dispatch({ type: 'START_PAGE_LOADING' });

    const categories = [];

    const keyArr = Object.keys(formValues);

    keyArr.forEach(key => {
      if (formValues[key] === true) {
        categories.push(key);
      }
    });

    const token = localStorage.getItem('token');

    // create the categories
    const promises = categories.map(category =>
      axios.post(
        `https://foodapp2021.herokuapp.com/api/v1/food_categories/new/${chefId}`,
        {
          category,
        }
      )
    );

    await Promise.all(promises);

    //create the menus
    const menuObj = {
      description: '',
      appetiser: 'dish',
      starter: 'dish',
      main: 'dish',
      dessert: 'dish',
    };

    const menuObjects = categories.map(category => {
      const obj = { ...menuObj };

      obj.food_category = category;

      return obj;
    });

    const menuPromises = menuObjects.map(el =>
      axios.post(
        `https://foodapp2021.herokuapp.com/api/v1/menus/${chefId}/new`,
        el
      )
    );

    const responses = await Promise.all(menuPromises);

    const datas = responses.map(res => res.data.menu);

    //create default images
    await datas.map(async menu => {
      const promiseArr = [];

      for (let i = 0; i < 3; i++) {
        const promise = axios.post(
          `https://foodapp2021.herokuapp.com/api/v1/menu_images/new/${menu.menu_id}`,
          {
            image_path:
              'https://pc-food-bucket.s3.ap-southeast-1.amazonaws.com/1619164360855',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        promiseArr.push(promise);
      }

      return await Promise.all(promiseArr);
    });

    // //navigate them to the update page
    history.push(`/chefs/update/${chefId}`);

    //stop loading
    dispatch({ type: 'STOP_PAGE_LOADING' });
  } catch (err) {
    //stop loading
    dispatch({ type: 'STOP_PAGE_LOADING' });

    // //navigate user to error page
    history.push('/error');
  }
};
