import { AiOutlineHeart } from "react-icons/ai";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { usePost } from "../context/postContext";
import { useSearchContext } from "../context/SearchContext";
import { useEffect } from "react";

const Row = ({ title, main = false, products = [] }) => {
  const { searchTerm, searchedProducts, updateSearchedProducts } =
    useSearchContext();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const result = filteredProducts.length > 0 ? filteredProducts : [];

  // useEffect(() => {
  //   const recentSearches =
  //     JSON.parse(localStorage.getItem("recentSearches")) || [];
  //   if (recentSearches.length > 0) {
  //     updateSearchedProducts(recentSearches[0]);
  //   }
  // }, []);

  return (
    <div className="mx-16">
      <div
        className={`wrapper ${
          main && "bg-slate-200/60"
        } min-h-[360px] px-3 relative overflow-hidden`}
      >
        <div className="flex justify-between">
          <h2 className="pt-3 mb-3 text-teal-950  text-2xl">{title}</h2>
          {main && (
            <>
              <Link className="p-4">
                <button className="underline text-teal-950 font-bold text-sm capitalize">
                  view more
                </button>
              </Link>
            </>
          )}
        </div>

        {/* <div className={`inline-flex justify-center gap-3 w-full relative`}> */}
        <div
          className={` ${
            main ? "inline-flex" : "flex flex-wrap"
          } gap-3 justify-start `}
        >
          {result &&
            result.map((product) => {
              return <Card key={product.id} product={product} />;
            })}

          {!main && result.length > 0 && (
            <Link to="/post">
              <HighlightCard />
            </Link>
          )}

          {!main && result.length < 1 && (
            <div className="flex flex-col items-center justify-center  py-10 bg-slate-100 w-full">
              <h2 className="text-teal-950 font-bold text-2xl">
                Oops... we didn't find anything that matches this search :(
              </h2>
              <p className="text-sm text-teal-950/70 py-2">
                Try search for something more general, change the filters or
                check for spelling mistakes
              </p>
              <img
                className="w-48 h-48"
                src="https://statics.olx.in/external/base/img/noResults.webp"
                alt=""
              />
            </div>
          )}

          {main && (
            <>
              <div className="absolute top-40 rounded-r-sm shadow-md right-4 bg-white py-5 text-2xl px-1 cursor-pointer">
                <FaAngleRight />
                {/* <FaAngleLeft /> */}
              </div>

              {searchedProducts &&
                searchedProducts.map((product) => {
                  return <Card key={product.id} product={product} />;
                })}

              <div className="absolute top-40 rounded-l-sm shadow-md left-[14px] bg-white py-5 text-2xl px-1 cursor-pointer">
                <FaAngleLeft />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

function Card({ product }) {
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

function HighlightCard() {
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

export default Row;
