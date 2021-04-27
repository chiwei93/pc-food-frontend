import React, { useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchData } from '../actions/proposalDetailsPageActions';
import PageContainer from '../containers/PageContainer';
import OrangeBtn from '../components/OrangeBtn';
import PageLoader from '../components/PageLoader';
import classes from './ProposalDetailsPage.module.css';
import logo from '../images/proposalDetail.png';

const ProposalDetailsPage = props => {
  const { proposalId } = props.match.params;

  const proposalDetailsPage = useSelector(state => state.proposalDetailsPage);

  const history = useHistory();

  const ui = useSelector(state => state.ui);

  const dispatch = useDispatch();

  //initialization and fetch data after the page first render
  useEffect(() => {
    const accountType = localStorage.getItem('accountType');

    if (accountType) {
      dispatch({ type: 'SET_ACCOUNT_TYPE', payload: accountType });
    }

    dispatch(fetchData(proposalId, history));
  }, []);

  //show loader when the page is loading
  if (ui.isPageLoading) {
    return <PageLoader />;
  }

  return (
    <PageContainer>
      <button className={classes.btnBack} onClick={() => history.goBack()}>
        <FaChevronLeft />
      </button>

      <div className={classes.header}>
        <img src={logo} alt="logo" className={classes.logo} />
        <h3 className={classes.heading}>Proposal's Details</h3>
      </div>

      <ul className={classes.detailsList}>
        <li className={classes.detailItem}>
          <div className={classes.detailContainer}>
            <p className={classes.label}>Name of customer:</p>
            <p className={classes.value}>{proposalDetailsPage.name}</p>
          </div>
        </li>
        <li className={classes.detailItem}>
          <div className={classes.detailContainer}>
            <p className={classes.label}>Email of customer:</p>
            <p className={classes.value}>{proposalDetailsPage.email}</p>
          </div>
        </li>
        <li className={classes.detailItem}>
          <div className={classes.detailContainer}>
            <p className={classes.label}>Phone of customer:</p>
            <p className={classes.value}>{proposalDetailsPage.phone}</p>
          </div>
        </li>
        <li className={classes.detailItem}>
          <div className={classes.detailContainer}>
            <p className={classes.label}>Type of sevice:</p>
            <p className={classes.value}>{proposalDetailsPage.service_type}</p>
          </div>
        </li>
        <li className={classes.detailItem}>
          <div className={classes.detailContainer}>
            <p className={classes.label}>No of people:</p>
            <p className={classes.value}>{proposalDetailsPage.pax}</p>
          </div>
        </li>
        <li className={classes.detailItem}>
          <div className={classes.detailContainer}>
            <p className={classes.label}>Meal:</p>
            <p className={classes.value}>{proposalDetailsPage.meal_type}</p>
          </div>
        </li>
        <li className={classes.detailItem}>
          <div className={classes.detailContainer}>
            <p className={classes.label}>Menu:</p>
            <p className={classes.value}>{proposalDetailsPage.menu_type}</p>
          </div>
        </li>
        <li className={classes.detailItem}>
          <div className={classes.detailContainer}>
            <p className={classes.label}>Hob:</p>
            <p className={classes.value}>{proposalDetailsPage.hob_type}</p>
          </div>
        </li>
        <li className={classes.detailItem}>
          <div className={classes.detailContainer}>
            <p className={classes.label}>Quantity of hob:</p>
            <p className={classes.value}>{proposalDetailsPage.no_of_hob}</p>
          </div>
        </li>
        <li className={classes.detailItem}>
          <div className={classes.detailContainer}>
            <p className={classes.label}>Oven:</p>
            <p className={classes.value}>
              {proposalDetailsPage.oven ? 'true' : 'false'}
            </p>
          </div>
        </li>
        <li className={classes.detailItem}>
          <div className={classes.detailContainer}>
            <p className={classes.label}>Price:</p>
            <p className={classes.value}>{`$${proposalDetailsPage.price}`}</p>
          </div>
        </li>
        <li className={classes.detailItem}>
          <div className={classes.detailContainer}>
            <p className={classes.label}>Diet restriction:</p>
            <p className={classes.value}>
              {proposalDetailsPage.diet_restrictions ? 'true' : 'false'}
            </p>
          </div>
        </li>
        <li className={classes.detailItem}>
          <div className={classes.detailContainer}>
            <p className={classes.label}>Extra:</p>
            <p className={classes.value}>{proposalDetailsPage.message}</p>
          </div>
        </li>
      </ul>

      <ul className={classes.btnContainer}>
        {!proposalDetailsPage.completed && ui.accountType !== 'chef' ? (
          <li className={classes.btnItem}>
            <OrangeBtn
              text="Cancel proposal"
              path={`/proposals/cancel/${proposalId}`}
            />
          </li>
        ) : (
          ''
        )}

        {!proposalDetailsPage.completed && ui.accountType !== 'user' ? (
          <li className={classes.btnItem}>
            <OrangeBtn
              text="Reject proposal"
              path={`/proposals/reject/${proposalId}`}
            />
          </li>
        ) : (
          ''
        )}

        {ui.accountType === 'chef' &&
        !proposalDetailsPage.confirmed &&
        !proposalDetailsPage.completed ? (
          <li className={classes.btnItem}>
            <OrangeBtn
              text="Confirm proposal"
              path={`/proposals/confirm/${proposalId}`}
            />
          </li>
        ) : (
          ''
        )}

        {ui.accountType === 'user' &&
        proposalDetailsPage.confirmed &&
        !proposalDetailsPage.completed ? (
          <li className={classes.btnItem}>
            <OrangeBtn
              text="Make Payment"
              path={`/proposals/payment/${proposalId}`}
            />
          </li>
        ) : (
          ''
        )}

        {proposalDetailsPage.confirmed &&
        ui.accountType === 'user' &&
        !proposalDetailsPage.completed ? (
          <li className={classes.btnItem}>
            <OrangeBtn
              text="Proposal Completed"
              path={`/proposals/complete/${proposalId}`}
            />
          </li>
        ) : (
          ''
        )}

        {proposalDetailsPage.completed && ui.accountType === 'user' ? (
          <li className={classes.btnItem}>
            <OrangeBtn
              text="Write a review"
              path={`/review/new/${proposalDetailsPage.chef}`}
            />
          </li>
        ) : (
          ''
        )}
      </ul>
    </PageContainer>
  );
};

export default ProposalDetailsPage;
