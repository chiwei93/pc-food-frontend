import React from 'react';
import classes from './ChefDescriptionItem.module.css';

const ChefDescriptionItem = ({
  images,
  description,
  appetiser,
  starter,
  main,
  dessert,
}) => {
  const renderImages = () => {
    return images?.map((img, index) => (
      <li className={classes.foodItem} key={index}>
        <img src={img} alt={`food${index + 1}`} className={classes.foodImage} />
      </li>
    ));
  };

  return (
    <div>
      <ul className={classes.foodImageContainer}>{renderImages()}</ul>

      <p className={classes.description}>{description}</p>

      <ul className={classes.menuContainer}>
        <h3 className={classes.menuHeading}>Menu</h3>

        <li className={classes.menuItem}>
          <ul className={classes.courseList}>
            <h4 className={classes.courseHeading}>Appetizer</h4>
            <li className={classes.courseItem}>
              <p className={classes.foodName}>{appetiser}</p>
            </li>
          </ul>
        </li>

        <li className={classes.menuItem}>
          <ul className={classes.courseList}>
            <h4 className={classes.courseHeading}>Starter</h4>
            <li className={classes.courseItem}>
              <p className={classes.foodName}>{starter}</p>
            </li>
          </ul>
        </li>

        <li className={classes.menuItem}>
          <ul className={classes.courseList}>
            <h4 className={classes.courseHeading}>Main</h4>
            <li className={classes.courseItem}>
              <p className={classes.foodName}>{main}</p>
            </li>
          </ul>
        </li>

        <li className={classes.menuItem}>
          <ul className={classes.courseList}>
            <h4 className={classes.courseHeading}>Dessert</h4>
            <li className={classes.courseItem}>
              <p className={classes.foodName}>{dessert}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ChefDescriptionItem;
