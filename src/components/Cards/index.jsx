import { useNavigate } from "react-router-dom";
import { usePost } from "../../context/postContext";
import { AiOutlineHeart } from "react-icons/ai";

export function Card({ product }) {
  const {
    title,
    description,
    photos,
    year,
    brand,
    kmDriven,
    price,
    highlight,
  } = product;

  const { setPostDetails } = usePost();
  const navigate = useNavigate();

  const handleProductView = () => {
    setPostDetails(product);
    navigate("/view");
  };

  return (
    <div
      className="bg-white px-2 py-2 border-2 w-[290px] h-[270px] rounded relative cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleProductView}
    >
      <div className="h-[140px]">
        <img
          src={photos[0]}
          alt="name"
          className="w-full h-full object-cover"
        />
      </div>

      {highlight && (
        <div className="absolute top-2 left-2 bg-yellow-300 px-2 uppercase text-xs py-1 mt-1 font-light">
          featured
        </div>
      )}

      <div className="absolute top-3 right-3 bg-white p-2 rounded-full cursor-pointer">
        <AiOutlineHeart size={25} />
        {/* <AiFillHeart size={25} /> */}
      </div>

      {highlight && (
        <div className="w-2 h-28 bg-yellow-300 absolute bottom-0 left-0 rounded-l-sm"></div>
      )}

      <div className="px-2 py-2 mt-4">
        <h2 className="font-bold text-lg">{price}</h2>
        <p className="text-sm text-teal-950">
          {year}-{kmDriven} km
        </p>
        <p className="text-sm text-stone-500 py-1">{title}</p>
        <span className="text-xs text-stone-500 absolute bottom-2 right-2">
          APR 07
        </span>
      </div>
    </div>
  );
}

export function HighlightCard() {
  return (
    <div className="bg-blue-500 px-3 py-2 border-2 w-[290px] h-[270px] rounded relative text-center relative cursor-pointer">
      <h2 className="text-white font-bold py-5">
        Want to see your stuff here?
      </h2>
      <p className="px-1 text-sm text-white ">
        Make some extra cash by selling things in your community. Go on, it's
        quick and easy.
      </p>
      <button className="border-2 hover:border-4 rounded-sm w-[230px] p-1 text-sm text-white font-bold absolute bottom-5 left-7 ">
        Start Selling
      </button>
    </div>
  );
}


export const TitleCard = ({ title }) => {
    return (
      <h2 className="text-lg font-bold uppercase pt-4 text-teal-950">{title}</h2>
    );
  };
