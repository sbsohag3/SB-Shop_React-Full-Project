import React from "react";
import mypic from "../../asserts/images/my.jpg";
import { FaUserAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdCastForEducation, MdEmail } from "react-icons/md";

const MyPortfolio = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={mypic}
            alt=""
            className="lg:max-w-sm rounded-lg shadow-2xl"
          />
          <div className="px-10">
            <h1 className="text-5xl font-bold">Hello There,</h1>
            <h2 className="text-2xl font-bold text-purple-400 italic">
              I'm Masud Rana Shohagh
            </h2>
            <p className="py-4">
              I am lifelong learner, passionate, and adventurer with a
              professional background in software business strategy. I love
              development because of the satisfaction get by overcoming new
              technologies' challenges. I am motivated by the opportunity that
              web systems work to positively impact the life of an individual,
              and the world as a whole.
            </p>
            <h3 className="text-xl text-green-500 font-bold">Education:</h3>
            <p className="pb-4">Diploma in Architecture</p>
            <h3 className="text-xl text-blue-600 font-bold">
              My Skills & Technologies:{" "}
            </h3>
            <p>
              Html | Css | Bootstrap | Tailwind | JavaScript | NodeJS | Firebase
              | ReactJS | ExpressJS | RESTful APIs | JSON parsing| JWT | MongoDB
              | Git | Github | etc.
            </p>
            <h3 className="text-xl text-orange-500 font-bold mt-4">
              My Project Link:
            </h3>
            <div className="flex gap-4 text-blue-400 ">
              <a
                className="hover:text-orange-500"
                href=" https://chipper-trifle-aecc96.netlify.app"
              >
                Project-1
              </a>
              <a
                className="hover:text-orange-500"
                href="https://sb-dress-empress.web.app"
              >
                Project-2
              </a>
              <a
                className="hover:text-orange-500"
                href="https://lambent-squirrel-79f80f.netlify.app"
              >
                Project-3
              </a>
            </div>
            <h3 className="text-xl text-secondary font-bold mt-4">
              Contact me:
            </h3>
            <div className="lg:flex gap-5">
              <div class="card  bg-neutral text-neutral-content p-3 mb-3">
                <h2 class="flex items-center gap-1">
                  <FaUserAlt />
                  Masud Rana Shohagh
                </h2>
              </div>

              <div class="card  bg-neutral text-neutral-content p-3 mb-3">
                <h2 class="flex items-center gap-1">
                  <BsFillTelephoneFill />
                  +8801719970202
                </h2>
              </div>
              <div class="card  bg-neutral text-neutral-content p-3 mb-3">
                <h2 class="flex items-center gap-1">
                  <MdEmail />
                  sbsohag3@gmail.com
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPortfolio;
