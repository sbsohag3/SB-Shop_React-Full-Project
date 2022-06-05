import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import { FaStar } from "react-icons/fa";

const MyReview = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [user] = useAuthState(auth);
  
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const imgStorageKey = "6086fdd79d560776ef7b4791962feaa0";

  const onSubmit = async (data) => {
    const image = data.image[0];
    const fromData = new FormData();
    fromData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imgStorageKey}`;
    fetch(url, {
      method: "POST",
      body: fromData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          const img = result.data.url;
          const review = {
            name: data.name,
            email: data.email,
            review: data.review,
            rating: data.rating,
            img: img,
          };

          if (data.rating > 0) {
            alert("please");
          }
          //send to databse

          fetch("https://pure-spire-28994.herokuapp.com/review", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(review),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                toast.success("Review Added Successfully", {
                  position: "top-center",
                });
                reset();
              } else {
                toast.error("Failed to add the Review", {
                  position: "top-center",
                });
              }
            });
        }
      });
  };
  return (
    <div className="flex mt-4 justify-center items-center my-12">
      <div className="card w-100 bg-base-100 shadow-xl">
        <div className="card-body bg-slate-100">
          <h2 className="text-center text-2xl font-bold">Please Review Our Products</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="form-control w-full max-w-xs">
                <input
                  type="email"
                  value={user?.email || ""}
                  placeholder="Your Email"
                  className="input input-bordered w-full max-w-xs"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is Required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Please Provide a Valid Email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={user?.displayName || ""}
                  className="input input-bordered w-full max-w-xs"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-xs">
                <textarea
                  rows="5"
                  cols="50"
                  placeholder="Say Your Comments"
                  className="input input-bordered w-full max-w-xs"
                  {...register("review", {
                    required: {
                      value: true,
                      message: "Review is Required",
                    },
                  })}
                ></textarea>
                <label className="label">
                  {errors.review?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.review.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Please Rating Us: {rating}</span>
                </label>
                <div className="flex">
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label key={i}>
                        <input
                          type="radio"
                          name="rating"
                          {...register("rating")}
                          onClick={() => setRating(ratingValue)}
                          className=" hidden"
                          value={ratingValue}
                        />
                        <FaStar
                          className="cursor-pointer"
                          color={
                            ratingValue <= (hover || rating)
                              ? "#ffc107"
                              : "lightgrey"
                          }
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Select Photo:</span>
                </label>
                <input
                  type="file"
                  {...register("image", {
                    required: {
                      value: true,
                      message: "Photo url is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.image?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.image.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <input
                className=" btn w-full  mt-7 max-w-xs text-white"
                type="submit"
                value="Add"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyReview;
