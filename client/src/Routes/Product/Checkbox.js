import React, { useState, useEffect } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = c => () => {
    const currentCategoryId = checked.indexOf(c); // return the first index or -1
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull / take off
    // 체크 했을때
    if (currentCategoryId === -1) {
      // c는 c._id , 즉 category id
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <li key={i}>
      <input onChange={handleToggle(c._id)} id={c._id} type="checkbox" value={checked.indexOf(c._id === -1)}></input>
      <label htmlFor={c._id}>{c.name}</label>
    </li>
  ));
};

export default Checkbox;
