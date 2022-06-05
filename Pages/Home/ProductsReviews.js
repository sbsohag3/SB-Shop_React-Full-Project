import useReviews from "../../hooks/useReviews";
import Review from "./Review";

const ProductsReviews = () => {
  const [reviews]= useReviews()
  return (
    <section className="lg:my-12 lg:px-12">
      <h2 className="text-3xl text-center text-info font-bold">What our Client say</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.slice(0, 6).map((review) => (
          <Review key={review._id} review={review}></Review>
        ))}
      </div>
    </section>
  );
};

export default ProductsReviews;
