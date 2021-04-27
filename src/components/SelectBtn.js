import React from 'react';
import { useDispatch } from 'react-redux';
import classes from './SelectBtn.module.css';

const SelectBtn = ({ menus, onChange }) => {
  const dispatch = useDispatch();

  return (
    <select
      name="food_category"
      id="food_category"
      className={classes.btnSelect}
      onChange={e => dispatch(onChange(e.target.value))}
    >
      {menus.map((data, index) => (
        <option value={index} key={index}>
          {data.food_category}
        </option>
      ))}
    </select>
  );
};

export default SelectBtn;
