import { useEffect, useState } from "react";

const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://pure-spire-28994.herokuapp.com/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return [reviews];
};

export default useReviews;
