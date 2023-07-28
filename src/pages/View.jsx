import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { usePost } from "../context/postContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const View = () => {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = usePost();

  useEffect(() => {
    const { userId } = postDetails;

    const getUserData = async (userId) => {
      try {
        const q = query(collection(db, "users"), where("id", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error("Error getting user data: ", error);
        return null;
      }
    };
    getUserData(userId);
  }, []);

  return (
    <div className="wrapper">
      <div className=" flex justify-start w-full my-5 ">
        <div>
          <div className=" bg-black w-[800px] min-h-[500px] ml-10 mr-5 rounded">
            <Carousel photos={postDetails.photos} />
          </div>
          <div className="border border-black/20 shadow rounded  max-w-[800px] min-h-[100px] ml-10 mt-2 mr-5 rounded px-3 py-3">
            <h2 className="text-teal-950 font-bold text-lg">Description</h2>
            <p className="text-teal-950/80 text-sm py-2">{postDetails.description}</p>
          </div>
        </div>

        <div>

          <div className="mr-10 border border-black/20 shadow rounded w-[460px] h-[150px] px-5 py-3">
            <h2 className="text-4xl font-bold text-teal-950">₹{postDetails.price}</h2>
            <p className="text-teal-950/60 py-1 text-md">{postDetails.title}</p>
          </div>

          {userDetails && (
            <div className="mr-10 border border-black/20 shadow rounded w-[460px] h-[200px] px-5 py-3 mt-2 flex flex-col items-center justify-center">
              <h2 className="text-xl text-center font-bold text-teal-950 capitalize">
                {userDetails.name}
              </h2>
              <button className="border w-full py-3 mt-3 border-2 border-teal-950 rounded">
                Chat with seller
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Carousel = ({ photos }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = photos || [];

  const prevSlide = () => {
    setActiveSlide((prev) => Math.max(prev - 1, 0));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  return (
    <div className="relative" data-te-carousel-init data-te-carousel-slide>
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${
              activeSlide === index ? "block" : "hidden"
            } float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
            data-te-carousel-item
            data-te-carousel-active
          >
            <img
              src={slide}
              className="block w-full "
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <button
        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        onClick={prevSlide}
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Previous
        </span>
      </button>
      <button
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        onClick={nextSlide}
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Next
        </span>
      </button>
    </div>
  );
};

export default View;
