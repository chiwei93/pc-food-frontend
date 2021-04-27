import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChefReviews } from '../actions/chefReviewsPageActions';
import BackBtn from '../components/BackBtn';
import PageContainer from '../containers/PageContainer';
import PageLoader from '../components/PageLoader';
import classes from './ChefReviewsPage.module.css';
import ReviewItem from '../components/ReviewItem';

const ChefReviewsPage = props => {
  const { chefId } = props.match.params;

  const chefReviewsPage = useSelector(state => state.chefReviewsPage);

  const history = useHistory();

  const ui = useSelector(state => state.ui);

  const dispatch = useDispatch();

  //fetch the reviews after the page renders
  useEffect(() => {
    dispatch(fetchChefReviews(chefId, history));
  }, []);

  //show loader when the page is loading
  if (ui.isPageLoading) {
    return <PageLoader />;
  }

  return (
    <PageContainer>
      <div className={classes.header}>
        <BackBtn path={`/chefs/${chefId}`} />
        <h2 className={classes.heading}>Reviews</h2>
      </div>

      <ul className={classes.reviewsList}>
        {chefReviewsPage.map((review, index) => (
          <li className={classes.reviewItem} key={index}>
            <ReviewItem review={review} />
          </li>
        ))}
      </ul>
    </PageContainer>
  );
};

export default ChefReviewsPage;
