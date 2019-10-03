import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URI } from '../util/URI';

const Main = () => {
  useEffect(() => {
    getPosts();
  }, []);

  const [msg, setMsg] = useState('');

  const getPosts = async () => {
    const res = await axios.get(BACKEND_URI);
    setMsg(res.data.message);
  };

  return <div>{msg}</div>;
};

export default Main;
