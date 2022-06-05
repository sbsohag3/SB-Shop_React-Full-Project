import React from 'react';
import { Link } from 'react-router-dom';
import Notfound from '../../asserts/images/notfound.png'

const NotFound = () => {
  return (
    <div className="grid m-12 justify-center items-center mx-auto">
      <img src={Notfound} alt="" />
      <Link to={"/"} className="btn btn-primary">
        go to homepage
      </Link>
    </div>
  );
};

export default NotFound;