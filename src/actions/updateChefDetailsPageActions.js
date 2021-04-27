import axios from 'axios';
import { toast } from 'react-toastify';

//switch menu when the select btn is clicked
export const onBtnSelectClick = index => {
  return { type: 'SET_UPDATE_CHEF_DETAILS_ACTIVE_MENU', payload: index };
};

//handling events when the upload btn is clicked
export const onUploadBtnClick = uploadType => {
  return { type: 'SET_UPLOAD_MODAL_TYPE', payload: uploadType };
};

//fetch menu data when the page is first loaded
export const fetchChefData = (chefId, history) => async dispatch => {
  try {
    //start loading
    dispatch({ type: 'START_PAGE_LOADING' });

    //fetch menus, categories and images
    const responses = await axios.get(
      `https://foodapp2021.herokuapp.com/api/v1/menus/chef/${chefId}`
    );

    const menus = responses.data.results;

    const imagePromises = menus.map(menu =>
      axios.get(
        `https://foodapp2021.herokuapp.com/api/v1/menu_images/${menu.menu_id}`
      )
    );

    const imageResponses = await Promise.all(imagePromises);

    const imageDatas = imageResponses.map(res => res.data);

    menus.forEach((menu, index) => {
      menu.images = imageDatas[index];
    });

    dispatch({ type: 'SET_UPDATE_CHEF_DETAILS_PAGE_MENUS', payload: menus });
    dispatch({ type: 'SET_UPDATE_CHEF_DETAILS_ACTIVE_MENU', payload: 0 });

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

//for updating menus
export const updateMenu = (formValues, menuId) => async dispatch => {
  try {
    dispatch({ type: 'START_UPDATING_CHEF_DETAILS_PAGE' });

    await axios.put(
      `https://foodapp2021.herokuapp.com/api/v1/menus/update/${menuId}`,
      formValues
    );

    dispatch({ type: 'STOP_UPDATING_CHEF_DETAILS_PAGE' });

    //notify the user that the menu is successfully updated
    toast.success('The menu had been updated successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err) {
    //stop the updating process
    dispatch({ type: 'STOP_UPDATING_CHEF_DETAILS_PAGE' });

    //notify the user that there was a error
    toast.error('Failed to update the menu', {
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
