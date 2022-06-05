import React from 'react';

import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import Products from './Products';
import ProductsReviews from './ProductsReviews';

const Home = () => {
  return (
    <div>
      <Banner/>
      <Products/>
      <ProductsReviews/>
      <BusinessSummary/>
      
    </div>
  );
};

export default Home;