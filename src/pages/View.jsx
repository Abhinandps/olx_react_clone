import { useEffect, useState } from "react";
import { usePost } from "../context/postContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Carousel } from "../components/Carousel";

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
            <p className="text-teal-950/80 text-sm py-2">
              {postDetails.description}
            </p>
          </div>
        </div>

        <div>
          <div className="mr-10 border border-black/20 shadow rounded w-[460px] h-[150px] px-5 py-3">
            <h2 className="text-4xl font-bold text-teal-950">
              ₹{postDetails.price}
            </h2>
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

export default View;
