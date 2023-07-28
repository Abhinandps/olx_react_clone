import { BiSearch } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import { UserAuth } from "../../context/AuthContext";

import { FaTimesCircle } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  const { user, logout } = UserAuth();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-slate-100 h-[70px]">
        <div className="wrapper flex h-full justify-between items-center px-8 ">
          <div className="flex h-full justify-between items-center gap-3">
            <Link to="/">
              <OlxIcon />
            </Link>
            <LocationSearchInput
              type="text"
              placeholder="Search city,area or locality"
            />
            <ContentSearchInput
              type="text"
              placeholder="Find Cars, Mobile Phones and more..."
            />
            <SelectLanguage />
          </div>

          <div className="flex items-center gap-3">
            {user?.displayName ? (
              <>
                <button onClick={handleSignOut}>Sign Out</button>
                <Link to="/post">
                  <button className="shadow-lg flex gap-1 items-center border-8 border-t-emerald-300 border-r-sky-600 border-b-yellow-300  border-l-yellow-300 py-1 px-3 rounded-3xl">
                    <FaPlus size={15} className="text-teal-950 text-xs" />
                    <span className="text-sm font-bold text-teal-950">
                      SELL
                    </span>
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button
                  className="text-teal-950 font-bold underline text-md"
                  onClick={togglePopup}
                >
                  Login
                </button>

                <Link>
                  <button
                    onClick={togglePopup}
                    className="shadow-lg flex gap-1 items-center border-8 border-t-emerald-300 border-r-sky-600 border-b-yellow-300  border-l-yellow-300 py-1 px-3 rounded-3xl"
                  >
                    <FaPlus size={15} className="text-teal-950 text-xs" />
                    <span className="text-sm font-bold text-teal-950">
                      SELL
                    </span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <PopUp isOpen={isOpen} onToggle={togglePopup} />
    </>
  );
};

function OlxIcon() {
  return (
    <svg
      width="48px"
      height="48px"
      viewBox="0 0 1024 1024"
      data-aut-id="icon"
      className=""
      fillRule="evenodd"
    >
      <path
        className="rui-w4DG7"
        d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"
      ></path>
    </svg>
  );
}

function LocationSearchInput({ type = "text", placeholder, size = 25 }) {
  return (
    <div className="hidden sm:inline-flex items-center bg-white w-[260px] border-2 border-teal-950   py-2 rounded focus-within:border-cyan-200">
      <BiSearch size={25} className="text-black ml-2" />
      <input
        type={type}
        className="bg-transparent text-md text-slate-800 w-full h-full outline-none pl-3"
        placeholder={placeholder}
      />
      <FaAngleDown size={size} className="text-black mx-2" />
    </div>
  );
}

function ContentSearchInput({ type = "text", placeholder }) {
  return (
    <div className="hidden sm:inline-flex relative w-[55px] md:w-[100px]  xl:w-[650px]">
      <div className="flex items-center relative bg-white w-0  md:w-[50px]  xl:w-[600px] z-[2]  border-2 border-teal-950  py-2 rounded focus-within:border-cyan-200">
        <input
          type={type}
          className="bg-transparent text-md text-slate-800 w-full h-full outline-none pl-3 py-1"
          placeholder={placeholder}
        />
      </div>
      <div className="flex items-center text-black h-full bg-teal-950 px-2 rounded-r-sm absolute right-3">
        <BiSearch size={25} className="text-white" />
      </div>
    </div>
  );
}

function SelectLanguage({ size = 25 }) {
  const languages = ["English", "हिंदी"];
  return (
    <div className="flex cursor-pointer relative">
      <span className="text-teal-950 font-bold uppercase">English</span>
      <FaAngleDown size={size} className="text-black mx-2" />

      {/* <ul className="rounded-sm w-[200px] bg-white absolute top-16 right-0 drop-shadow-md">
        {languages.map((lang, i) => {
          return (
            <li
              className="flex items-center justify-between py-3 px-3 text-teal-950 text-sm font-bold"
              key={i}
            >
              {lang}
              <FaCheck size={20} className="text-teal-800" />
            </li>
          );
        })}
      </ul>
       */}
    </div>
  );
}

function PopUp({ isOpen, onToggle }) {
  const popupRef = useRef(null);

  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      {isOpen && (
        <div
          ref={popupRef}
          className="flex justify-center items-center bg-black/80 fixed top-0 left-0 w-full h-full z-[777]"
        >
          <div className="bg-white shadow-md px-5 py-5 min-w-[400px] rounded-sm h-[90vh] mt-10 relative">
            <MdClose
              onClick={onToggle}
              size={35}
              className="text-teal-950 absolute top-2 cursor-pointer right-2"
            />
            <div className="flex flex-col justify-center items-center mt-3">
              <img
                src="https://statics.olx.in/external/base/img/loginEntryPointPost.webp"
                alt=""
                className="w-24"
              />
              <p className="text-center mt-3 text-sm text-teal-900 font-bold ">
                Help Us Become one of the safest places <br />
                to by and cell
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-10">
              <button className="border-2 text-left border-teal-950 rounded  text-teal-950 font-bold py-3 px-5">
                Continue with Email
              </button>
              <button
                onClick={handleGoogleSignIn}
                className="border-2 text-left border-teal-950 rounded px-5 text-teal-950 font-bold py-3"
              >
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
