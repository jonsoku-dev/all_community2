import React, { useState, useEffect } from 'react';

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = e => {
    handleFilters(e.target.value);
  };

  return prices.map((p, i) => (
    <li key={i}>
      <input onChange={handleChange} id={p._id} type="radio" name={p} value={p._id}></input>
      <label htmlFor={p._id}>{p.name}</label>
    </li>
  ));
};

export default RadioBox;
