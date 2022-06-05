import React from 'react';
import { FaFlagCheckered } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const BusinessSummary = () => {
  return (
    <div className="mb-12 p-12 bg-base-200">
      <div className="text-center mb-12">
        <h1 className="lg:text-5xl text-3xl uppercase font-bold text-info">
          Millions Business Trust Us
        </h1>
        <h1 className='lg:text-3xl text-2xl font-bold'>Dont Hesitate to Contact Us</h1>
      </div>
      <div className="stats stats-vertical lg:stats-horizontal lg:flex text-center lg:align-center shadow">
        <div className="stat place-items-center">
          <div className="text-6xl text-info">
            <FaFlagCheckered />
          </div>
          <div className="stat-title text-2xl text-info font-bold">
            Countries
          </div>
          <div className="stat-value">51</div>
          <div className="stat-desc">From January 1st to February 1st</div>
        </div>

        <div className="stat place-items-center">
          <div className="text-6xl text-info">
            <FaUsers />
          </div>
          <div className="stat-title text-2xl text-info font-bold">Client</div>
          <div className="stat-value text-secondary">4,200+</div>
          <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
        </div>

        <div className="stat place-items-center">
          <div className="text-6xl">
            <FcLike />
          </div>
          <div className="stat-title text-2xl text-info font-bold">Feedbacks</div>
          <div className="stat-value">1,200+</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;