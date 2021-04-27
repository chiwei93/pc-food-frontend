import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaStar, FaRegStar } from 'react-icons/fa';
import TextareaAutosize from 'react-textarea-autosize';
import {
  onRatingBtnClick,
  onTextAreaChange,
  postReview,
  fetchChefData,
} from '../actions/reviewFormAction';
import PageContainer from '../containers/PageContainer';
import PageLoader from '../components/PageLoader';
import SubmitBtn from '../components/SubmitBtn';
import classes from './ReviewFormPage.module.css';

const ReviewFormPage = props => {
  const { chefId } = props.match.params;

  const history = useHistory();

  const reviewForm = useSelector(state => state.reviewForm);
  const ui = useSelector(state => state.ui);

  const dispatch = useDispatch();

  //fetch the relevant chef data when the page first render
  useEffect(() => {
    dispatch(fetchChefData(chefId, history));
  }, []);

  //render star
  const renderRating = (rating, value) => {
    if (rating >= value) {
      return (
        <button
          className={classes.ratingBtn}
          onClick={() => dispatch(onRatingBtnClick(value))}
        >
          <FaStar />
        </button>
      );
    } else {
      return (
        <button
          className={classes.ratingBtn}
          onClick={() => dispatch(onRatingBtnClick(value))}
        >
          <FaRegStar />
        </button>
      );
    }
  };

  //handling form submit
  const onFormSubmit = (chefId, history) => {
    const formValues = {};

    formValues.rating = reviewForm.rating;
    formValues.comment = reviewForm.review;
    formValues.chef = chefId;

    dispatch(postReview(formValues, history));
  };

  //show loader when the page is loading
  if (ui.isPageLoading) {
    return <PageLoader />;
  }

  return (
    <PageContainer>
      <div className={classes.header}>
        <img
          src={reviewForm.chef.profileImage}
          alt={reviewForm.chef.name}
          className={classes.chefImage}
        />
        <p className={classes.name}>{reviewForm.chef.name}</p>
      </div>

      <div>
        <ul className={classes.ratingList}>
          <h4 className={classes.ratingHeading}>Rating:</h4>
          {[1, 2, 3, 4, 5].map(value => (
            <li className={classes.ratingItem} key={value}>
              {renderRating(reviewForm.rating, value)}
            </li>
          ))}
        </ul>

        <div className={classes.textAreaContainer}>
          <h4 className={classes.reviewHeading}>Review:</h4>
          <TextareaAutosize
            minRows="10"
            className={classes.textarea}
            onChange={e => dispatch(onTextAreaChange(e.target.value))}
            value={reviewForm.review}
          />
        </div>

        <div className={classes.btnContainer}>
          <SubmitBtn
            text={reviewForm.isPageLoading ? 'In Progress...' : 'Create Review'}
            onClick={() => onFormSubmit(chefId, history)}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default ReviewFormPage;
