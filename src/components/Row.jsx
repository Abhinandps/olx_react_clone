import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";
import { Card, HighlightCard } from "./Cards";

const Row = ({ title, main = false, products = [], loader }) => {
  const { searchTerm, searchedProducts } = useSearchContext();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const result = filteredProducts.length > 0 ? filteredProducts : [];

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

export default Row;
