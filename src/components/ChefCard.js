import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Heart from './Heart';
import classes from './ChefCard.module.css';

const ChefCard = ({
  ratingAverage,
  profileImage,
  _id,
  name,
  categories,
  likes,
}) => {
  return (
    <li className={classes.item}>
      <Link to={`/chefs/${_id}`} className={classes.cardContainer}>
        <div className={classes.imageContainer}>
          <img src={profileImage} alt={name} className={classes.chefImage} />
        </div>
        <div className={classes.detailContainer}>
          <p className={classes.name}>{name}</p>
          <ul className={classes.categoriesList}>
            {categories?.map((el, index) => (
              <li className={classes.categoryItem} key={index}>
                <p className={classes.category}>{el}</p>
              </li>
            ))}
          </ul>
          <Rating rating={ratingAverage} />
        </div>
        <div className={classes.heartContainer}>
          <Heart /> <span className={classes.likeNumber}>{likes}</span>
        </div>
      </Link>
    </li>
  );
};

export default ChefCard;
