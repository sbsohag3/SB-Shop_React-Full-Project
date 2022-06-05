import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import userlogo from "../../asserts/images/user.png";

const MyProfile = () => {
  const [user] = useAuthState(auth);
  
  return (
    <div className="mx-12">
      <h1 className="text-4xl text-blue-600 mb-3">My Profile</h1>
      <div className="bg-base-200 ">
        <div className="hero-content flex-col justify-items-center lg:flex-row lg:justify-start lg:items-start p-10">
          <div>
            <div className="avatar">
              <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL || userlogo} alt="" />
              </div>
            </div>
            <div className="flex justify-center items-center my-2 ">
              <button className="btn btn-sm btn-secondary">edit profile</button>
            </div>
          </div>

          <div className="mx-5">
            <p className="text-xl ">Full name:</p>
            <h1 className="text-xl font-bold"> {user.displayName}</h1>
            <br />
            <p className="text-xl ">Email Address:</p>
            <p className=" text-xl font-bold"> {user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
