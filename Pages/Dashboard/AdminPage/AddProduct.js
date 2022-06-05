import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";

const AddProduct = () => {
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
        if (result.success) {
          const img = result.data.url;
          const product = {
            name: data.name,
            email: data.email,
            brand: data.brand,
            price: data.price,
            stock: data.stock,
            descriptions: data.descriptions,
            img: img,
          };

          //send to databse

          fetch("https://pure-spire-28994.herokuapp.com/product", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                toast.success("Product Added Successfully", {
                  position: "top-center",
                });
                reset();
              } else {
                toast.error("Failed to add the Product", {
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
          <h2 className="text-center text-2xl font-bold">Add a New Product</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid mt-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
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
                  placeholder="Product Name"
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
                <input
                  type="text"
                  placeholder="Brand Name"
                  className="input input-bordered w-full max-w-xs"
                  {...register("brand", {
                    required: {
                      value: true,
                      message: "Brand is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.brand?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.brand.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <input
                  type="number"
                  placeholder="Product Price"
                  className="input input-bordered w-full max-w-xs"
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Price is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.price?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.price.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <input
                  type="number"
                  placeholder="Product Quantity"
                  className="input input-bordered w-full max-w-xs"
                  {...register("stock", {
                    required: {
                      value: true,
                      message: "Quantity is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.stock?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.stock.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <textarea
                  rows="5"
                  cols="50"
                  placeholder="Product Descriptions"
                  className="input input-bordered w-full max-w-xs"
                  {...register("descriptions", {
                    required: {
                      value: true,
                      message: "Descriptions is Required",
                    },
                  })}
                ></textarea>
                <label className="label">
                  {errors.descriptions?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.descriptions.message}
                    </span>
                  )}
                </label>
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

export default AddProduct;
