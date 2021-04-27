import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchChefData,
  onTabBtnClick,
  onBtnSelectChange,
} from '../actions/chefDetailPageActions';
import PageContainer from '../containers/PageContainer';
import ChefDescriptionItem from '../components/ChefDescriptionItem';
import Rating from '../components/Rating';
import TabBtn from '../components/TabBtn';
import ReviewItem from '../components/ReviewItem';
import OrangeBtn from '../components/OrangeBtn';
import SelectBtn from '../components/SelectBtn';
import PageLoader from '../components/PageLoader';
import ChefCardLoader from '../components/ChefCardLoader';
import classes from './ChefDetailPage.module.css';
import 'react-calendar/dist/Calendar.css';

const tabs = [{ text: 'description' }, { text: 'reviews' }];

const ChefDetailPage = props => {
  const { id } = props.match.params;

  const dispatch = useDispatch();

  const history = useHistory();

  //fetching initial chef data when it first renders
  useEffect(() => {
    const accountType = localStorage.getItem('accountType');

    if (accountType) {
      dispatch({ type: 'SET_ACCOUNT_TYPE', payload: accountType });
    }

    const token = localStorage.getItem('token');

    if (token) {
      dispatch({ type: 'SIGNED_IN' });
    }

    dispatch(fetchChefData(id, history));
  }, []);

  const chefDetailPage = useSelector(state => state.chefDetailPage);

  const ui = useSelector(state => state.ui);

  const active = ui.accountType === 'chef' ? classes.active : null;

  //render reviews
  const renderReviews = () => {
    //displaying loader when the fetching reviews
    if (chefDetailPage.isReviewsLoading) {
      return <ChefCardLoader />;
    }

    //displaying no reviews text when there is no review
    if (chefDetailPage.reviews.length === 0) {
      return (
        <li>
          <p>No reviews for the current chef yet.</p>
        </li>
      );
    }

    //display the reviews and button
    return (
      <>
        {chefDetailPage.reviews.map((review, index) => (
          <li className={classes.reviewItem} key={index}>
            <ReviewItem review={review} />
          </li>
        ))}
        <li>
          <OrangeBtn path={`/chefs/${id}/reviews`} text="See All Reviews" />
        </li>
      </>
    );
  };

  //setting the styling for the confirmed dates on the calendar
  const setActiveTileClass = date => {
    let activeClass;

    chefDetailPage.chef.confirmedDates?.forEach(confirmedDate => {
      if (
        date.date.getDate() === confirmedDate.getDate() &&
        date.date.getMonth() === confirmedDate.getMonth() &&
        date.date.getYear() === confirmedDate.getYear()
      ) {
        activeClass = classes.calendarActiveTiles;
      }
    });

    return activeClass;
  };

  //will return a loader when the page is fetching data
  if (ui.isPageLoading) {
    return <PageLoader />;
  }

  //after loading, render the component
  return (
    <PageContainer>
      <div className={classes.btnUpdateContainer}>
        <Link
          to={`/chefs/update/${id}`}
          className={`${classes.btnUpdate} ${active}`}
        >
          Update Page
        </Link>
      </div>

      <div className={classes.contentContainer}>
        <img
          src={chefDetailPage.chef.profileImage}
          alt={chefDetailPage.chef.name}
          className={classes.chefImage}
        />
        <h2 className={classes.name}>{chefDetailPage.chef.name}</h2>

        <ul className={classes.categoriesList}>
          {chefDetailPage.chef.categories?.map((category, index) => {
            return (
              <li className={classes.categoryItem} key={index}>
                <h4 className={classes.categories}>{category}</h4>
              </li>
            );
          })}
        </ul>

        <div className={classes.ratingContainer}>
          <Rating rating={chefDetailPage.chef.ratingAverage} />
        </div>

        <ul className={classes.tabsContainer}>
          {tabs.map((tab, index) => (
            <TabBtn
              key={index}
              {...tab}
              activeSection={chefDetailPage.activeSection}
              onClick={() => dispatch(onTabBtnClick(tab.text, id))}
            />
          ))}

          {chefDetailPage.activeSection === 'description' ? (
            <li>
              <SelectBtn
                menus={chefDetailPage.menus}
                onChange={onBtnSelectChange}
              />
            </li>
          ) : (
            ''
          )}
        </ul>

        {chefDetailPage.activeSection === 'reviews' ? (
          <ul className={classes.reviewsContainer}>{renderReviews()}</ul>
        ) : (
          ''
        )}

        {chefDetailPage.activeSection === 'description' ? (
          <ChefDescriptionItem {...chefDetailPage.activeMenu} />
        ) : (
          ''
        )}

        <div className={classes.proposalContainer}>
          <p className={classes.proposalHeading}>
            Make sure to send a proposal three days before.
          </p>

          <ul className={classes.btnList}>
            {ui.accountType === 'chef' ? (
              <li className={classes.btnItem}>
                <OrangeBtn
                  path={`/proposals`}
                  text="Go to my proposal requests"
                />
              </li>
            ) : (
              <li className={classes.btnItem}>
                <OrangeBtn
                  path={ui.isSignedIn ? `/chefs/${id}/proposal` : `/signup`}
                  text="Send proposal"
                />
              </li>
            )}
            {ui.accountType === 'user' && ui.isSignedIn ? (
              <li className={classes.btnItem}>
                <OrangeBtn
                  path={`/chats/${chefDetailPage.chef.email}`}
                  text="Chat with chef"
                />
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
    </PageContainer>
  );
};

export default ChefDetailPage;
