import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProposal } from '../actions/proposalConfirmationPageActions';
import PageContainer from '../containers/PageContainer';
import SubmitBtn from '../components/SubmitBtn';
import classes from './ConfirmProposalPage.module.css';
import logo from '../images/confirm.png';

const RejectProposalPage = props => {
  const { proposalId } = props.match.params;

  const dispatch = useDispatch();

  const history = useHistory();

  const proposalLoading = useSelector(state => state.proposalConfirmationPage);

  //handle btn click
  const onBtnClick = () => {
    dispatch(updateProposal(proposalId, history, 'reject'));
  };

  return (
    <PageContainer>
      <div className={classes.header}>
        <img src={logo} alt="logo" className={classes.logo} />
        <h2 className={classes.heading}>Rejection</h2>
      </div>
      <p className={classes.message}>
        Are you sure you want to reject this proposal?
      </p>

      <div className={classes.btnContainer}>
        <SubmitBtn
          text={proposalLoading ? 'In Progress...' : 'Reject Proposal'}
          onClick={onBtnClick}
        />
      </div>
    </PageContainer>
  );
};

export default RejectProposalPage;
