import React from 'react';
import moment from 'moment';
import Rating from './Rating';
import classes from './ReviewItem.module.css';

const ReviewItem = ({ review }) => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.header}>
        <img
          src={review.user.profileImage}
          alt={review.user.name}
          className={classes.userImage}
        />
        <div className={classes.detailsContainer}>
          <p className={classes.name}>{review.user.name}</p>
          <p className={classes.date}>
            {moment(review.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </p>
        </div>
        <div className={classes.ratingContainer}>
          <Rating rating={review.rating} />
        </div>
      </div>
      <p className={classes.review}>{review.comment}</p>
    </div>
  );
};

export default ReviewItem;
