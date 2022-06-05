import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import "../Login/Login.css";
import auth from "../../../firebase.init";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Loading from "../../Shared/Loading";
import useToken from "../../../hooks/useToken";

const SignUp = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [token] = useToken(user || gUser);
  const navigate = useNavigate();

  let signInError;

  if (loading || gLoading || updating) {
    return <Loading></Loading>;
  }

  if (error || gError || updateError) {
    signInError = (
      <p className="text-red-500">
        <small>
          {error?.message || gError?.message || updateError?.message}
        </small>
      </p>
    );
  }

  if (token) {
    navigate("/");
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    console.log("update done");
  };
  return (
    <div className="flex lg:h-screen mt-10 justify-center items-center">
      <div className="card w-96 bg-base-300 shadow-xl">
        <div className="card-body">
          <h1 className="text-center text-5xl text-info font-bold my-5">
            Sig Up
          </h1>

          <div className="main">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <span>
                  <FaUserAlt className="icon" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is Required",
                      },
                    })}
                  />
                </span>
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>
              <div>
                <span>
                  <MdEmail className="icon" />
                  <input
                    type="email"
                    placeholder="Email ID"
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
                </span>
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
              <div>
                <span>
                  <FaLock className="icon" />
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is Required",
                      },
                      minLength: {
                        value: 6,
                        message: "Must be 6 characters or longer",
                      },
                    })}
                  />
                </span>
                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>
              {signInError}
              <button className="login-btn btn btn-info">Sign Up</button>
            </form>
          </div>
          <p className="text-center">
            <small>
              Already Have an Account ?
              <Link className="text-primary" to="/login">
                Login
              </Link>
            </small>
          </p>
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-base-100"
          >
            <FcGoogle className="mx-1 text-2xl" />
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
