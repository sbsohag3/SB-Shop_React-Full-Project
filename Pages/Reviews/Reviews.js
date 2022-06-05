import React from 'react';
import useReviews from '../../hooks/useReviews';
import Review from '../Home/Review';

const Reviews = () => {
 const [reviews] = useReviews();
 return (
   <section className="my-12 px-12">
     <h2 className="text-3xl text-center text-info font-bold">
      Products Reviews
     </h2>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
       {reviews.map((review) => (
         <Review key={review._id} review={review}></Review>
       ))}
     </div>
   </section>
 );
};

export default Reviews;