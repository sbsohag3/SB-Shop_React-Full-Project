import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading";
import useToken from "../../../hooks/useToken";

const Login = () => {
  const [signInWithEmailAndPassword, sUser, sLoading, sError] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [token] = useToken(sUser || gUser);

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, token]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let signInError;

  if (gLoading || sLoading) {
    return <Loading />;
  }
  if (sError || gError) {
    signInError = (
      <p className="text-red-500 text-center">
        {sError?.message || gError?.message}
      </p>
    );
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="flex lg:h-screen my-5 justify-center items-center">
      <div className="card w-96 bg-base-300 shadow-xl">
        <div className="card-body">
          <h1 className="text-center text-5xl font-bold text-info my-5">
            Log In
          </h1>

          <div className="main">
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <button className="login-btn btn btn-info">Login</button>
            </form>
          </div>
          <p className="text-center">
            <small>
              New to Doctors Portal ?{" "}
              <Link className="text-primary" to="/signup">
                Create New Account
              </Link>
            </small>
          </p>
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className=" btn btn-base-100"
          >
            <FcGoogle className="mx-1 text-2xl" />
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
