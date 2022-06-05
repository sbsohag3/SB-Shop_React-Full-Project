import React from "react";

const Blog = () => {
  return (
    <div className="grid mt-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 p-12">
      <div className="card w-100 bg-neutral p-5 text-neutral-content">
        <h2 className="card-title">
          1. What are the different ways to manage a state in a React
          application??
        </h2>
        <article>
          It can accept any valid data value, including primitive and object
          values. Additionally, its set function can be passed on to other
          components as a callback function. To handle this, however, you should
          choose a third party solution. Many developers are interested in using
          built-in reactive features, such as the Context API, to manage their
          situation.
        </article>
      </div>
      <div className="card w-100 p-5 bg-neutral text-neutral-content">
        <h2 className="card-title">
          2. How will you improve the performance of a React Application?
        </h2>
        <article>
          Keep the condition of the material localized where necessary.
          Remembering feedback elements to prevent unnecessary re-rendering
          Code-segmentation in response using dynamics. Window or list
          virtualization in response.
        </article>
      </div>
      <div className="card w-100 p-5 bg-neutral text-neutral-content">
        <h2 className="card-title">3. How does prototypical inheritance work?</h2>
        <article>
          You have to work for the object as well. It then sets the prototype of
          an object. The new one has to accept the object as an operand, not
          just a function. The instanceof object must be allowed to move to its
          right The super function does the same thing for sample and object
          instances: it looks for super-properties starting at the prototype
          where the current system is located.
        </article>
      </div>
      <div className="card w-100 p-5 bg-neutral text-neutral-content">
        <h2 className="card-title">
          4. You have an array of products. Each product has a name, price,
          description, etc. How will you implement a search to find products by
          name?
        </h2>
        <article>
          Inside our APP function we use the useState () hook to set the query
          to an empty string. We also have setQ which we will use to build value
          from our search form use useState to define an array of default values
          that we want to be able to search from the API. This means that we
          want to be able to search for anything just by its name.
        </article>
      </div>
      <div className="card w-100 p-5 bg-neutral text-neutral-content">
        <h2 className="card-title">
          5. What is a unit test? Why should write unit tests?
        </h2>
        <article>
          The first purpose of testing is to prevent regression. Regression is a
          recurrence of a bug that has been previously corrected. This stops a
          feature from working after a certain event. The test confirms the
          effectiveness of complex components and modular applications. Testing
          is required for the effective functionality of a software application
          or product.
        </article>
      </div>
    </div>
  );
};

export default Blog;
