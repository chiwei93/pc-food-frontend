import React from 'react';
import moment from 'moment';
import OrangeBtn from './OrangeBtn';
import classes from './ProposalItem.module.css';

const ProposalItem = ({ proposal }) => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.header}>
        <img
          src={proposal.account?.profileImage}
          alt={proposal.account?.name}
          className={classes.userImage}
        />
        <div className={classes.detailsContainer}>
          <p className={classes.name}>{proposal.account?.name}</p>
          <p className={classes.date}>
            {moment(proposal.createdAt).format('MMMM Do YYYY')}
          </p>
        </div>
      </div>

      <p className={classes.description}>{`Proposal for event on ${moment(
        proposal.proposalDate
      ).format('MMMM Do YYYY')}`}</p>

      <div className={classes.btnContainer}>
        <OrangeBtn
          path={`/proposals/${proposal.booking_id}`}
          text="View Details"
        />
      </div>
    </div>
  );
};

export default ProposalItem;
