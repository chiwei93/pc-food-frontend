import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, connect } from 'react-redux';
import {
  fetchChefData,
  onBtnSelectClick,
  onUploadBtnClick,
  updateMenu,
} from '../actions/updateChefDetailsPageActions';
import PageContainer from '../containers/PageContainer';
import UpdateTextArea from '../components/UpdateTextArea';
import UpdateTextInput from '../components/UpdateTextInput';
import UploadBtn from '../components/UploadBtn';
import SubmitBtn from '../components/SubmitBtn';
import SelectBtn from '../components/SelectBtn';
import PageLoader from '../components/PageLoader';
import classes from './UpdateChefDetailsPage.module.css';

const UpdateChefDetailsPage = props => {
  const { chefId } = props.match.params;

  const dispatch = useDispatch();

  const history = useHistory();

  //fetch chef data when the page first render
  useEffect(() => {
    dispatch(fetchChefData(chefId, history));
  }, []);

  //handle form submit
  const onUpdateFormSubmit = formValues => {
    dispatch(
      updateMenu(formValues, props.updateChefDetailsPage.activeMenu.menu_id)
    );
  };

  //show loader when the page is loading
  if (props.ui.isPageLoading) {
    return <PageLoader />;
  }

  return (
    <PageContainer>
      <div className={classes.selectBtnContainer}>
        <SelectBtn
          menus={props.updateChefDetailsPage.menus}
          onChange={onBtnSelectClick}
        />
      </div>

      <ul className={classes.imagesList}>
        {props.updateChefDetailsPage.activeMenu.images?.map(image => (
          <li className={classes.imageItem} key={image.menu_images_id}>
            <img
              src={image.image_path}
              alt={image._menu_images_id}
              className={classes.image}
            />
            <div className={classes.uploadBtnContainer}>
              <UploadBtn
                path={`/upload/${image.menu_images_id}`}
                onClick={() => {
                  dispatch(onUploadBtnClick('menuImages'));
                  dispatch({
                    type: 'SET_MODAL_IMAGE_TYPE',
                    payload: 'menu_image',
                  });
                }}
              />
            </div>
          </li>
        ))}
      </ul>

      <form
        className={classes.updateForm}
        onSubmit={props.handleSubmit(onUpdateFormSubmit)}
      >
        <Field
          name="description"
          component={UpdateTextArea}
          label="description"
        />

        <ul className={classes.menuList}>
          <h4 className={classes.menuHeading}>Menu</h4>

          <li className={classes.menuCategoryItem}>
            <Field
              name="appetiser"
              component={UpdateTextInput}
              label="appetizer"
              inputType="text"
            />
          </li>

          <li className={classes.menuCategoryItem}>
            <Field
              name="starter"
              component={UpdateTextInput}
              label="starter"
              inputType="text"
            />
          </li>

          <li className={classes.menuCategoryItem}>
            <Field
              name="main"
              component={UpdateTextInput}
              label="main"
              inputType="text"
            />
          </li>

          <li className={classes.menuCategoryItem}>
            <Field
              name="dessert"
              component={UpdateTextInput}
              label="dessert"
              inputType="text"
            />
          </li>
        </ul>

        <div className={classes.submitBtnContainer}>
          <SubmitBtn
            text={
              props.updateChefDetailsPage.isUpdating
                ? 'Updating...'
                : 'Save Changes'
            }
          />

          <Link to={`/chefs/${chefId}`} className={classes.pageBtn}>
            See Your Page
          </Link>
        </div>
      </form>
    </PageContainer>
  );
};

//initialise the form data
const form = reduxForm({ form: 'updateMenuForm', enableReinitialize: true })(
  UpdateChefDetailsPage
);

const mapStateToProps = state => {
  return {
    initialValues: {
      appetiser: state.updateChefDetailsPage.activeMenu.appetiser,
      starter: state.updateChefDetailsPage.activeMenu.starter,
      main: state.updateChefDetailsPage.activeMenu.main,
      dessert: state.updateChefDetailsPage.activeMenu.dessert,
      description: state.updateChefDetailsPage.activeMenu.description,
    },
    ui: state.ui,
    updateChefDetailsPage: state.updateChefDetailsPage,
  };
};

export default connect(mapStateToProps)(form);
