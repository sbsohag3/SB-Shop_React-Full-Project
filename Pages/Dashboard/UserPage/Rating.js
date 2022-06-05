import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div className="flex">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              onClick={() => setRating(ratingValue)}
              className=" hidden"
              value={ratingValue}
            />
            <FaStar
              className="cursor-pointer"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "lightgrey"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <p>Your Rating is: {rating}</p>
    </div>
  );
};

export default Rating;
