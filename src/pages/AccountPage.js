import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import {
  fetchUserData,
  onUploadBtnClick,
  updateAccountInfo,
} from '../actions/accountPageActions';
import PageContainer from '../containers/PageContainer';
import UpdateTextInput from '../components/UpdateTextInput';
import UploadBtn from '../components/UploadBtn';
import SubmitBtn from '../components/SubmitBtn';
import PageLoader from '../components/PageLoader';
import classes from './AccountPage.module.css';

const AccountPage = props => {
  const dispatch = useDispatch();

  const history = useHistory();

  //set account type and fetch user data
  useEffect(() => {
    const accountType = localStorage.getItem('accountType');

    if (accountType) {
      dispatch({ type: 'SET_ACCOUNT_TYPE', payload: accountType });
    }

    dispatch(fetchUserData(history));
  }, []);

  //handling form submit
  const onFormSubmit = formValues => {
    dispatch(updateAccountInfo(formValues, props.ui.accountType));
  };

  //will render the page loader when the page is fetching data
  if (props.ui.isPageLoading) {
    return <PageLoader />;
  }

  return (
    <PageContainer>
      <h2 className={classes.heading}>Your Account</h2>

      <div className={classes.imageContainer}>
        <img
          src={props.accountPage.activeAccount.profileImage}
          alt={props.accountPage.activeAccount.name}
          className={classes.profileImage}
        />

        <div className={classes.uploadContainer}>
          <UploadBtn
            path={`/upload/${props.accountPage.activeAccount._id}`}
            onClick={() => {
              dispatch(onUploadBtnClick(props.ui.accountType));

              if (props.ui.accountType === 'chef') {
                dispatch({
                  type: 'SET_MODAL_IMAGE_TYPE',
                  payload: 'chef_image',
                });
              } else {
                dispatch({
                  type: 'SET_MODAL_IMAGE_TYPE',
                  payload: 'user_image',
                });
              }
            }}
          />
        </div>
      </div>

      <form
        className={classes.detailForm}
        onSubmit={props.handleSubmit(onFormSubmit)}
      >
        <ul className={classes.detailsList}>
          <li className={classes.detailItem}>
            <Field
              name="name"
              component={UpdateTextInput}
              label="name"
              inputType="text"
            />
          </li>
        </ul>

        <div className={classes.btnContainer}>
          <SubmitBtn
            text={props.accountPage.isUpdating ? 'Updating...' : 'Save Changes'}
          />
        </div>
      </form>
    </PageContainer>
  );
};

const form = reduxForm({
  form: 'updateAccountInfoForm',
  enableReinitialize: true,
})(AccountPage);

const mapStateToProps = state => {
  return {
    initialValues: {
      name: state.accountPage.activeAccount.name,
    },
    ui: state.ui,
    accountPage: state.accountPage,
  };
};

export default connect(mapStateToProps)(form);
