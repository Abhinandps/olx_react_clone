import { useEffect, useState } from "react";
import CategoryList from "../components/Category";
import Row from "../components/Row";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "../components/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const allPostData = querySnapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));

        setProducts(allPostData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <CategoryList />
      {/* <Row title="Based on your latest search" main={true} /> */}

      {loader ? (
        <div className="wrapper flex gap-5 px-24 py-14">
          <Loader />
          <Loader />
        </div>
      ) : (
        <Row
          products={products}
          loader={loader}
          title="Fresh recommendations"
        />
      )}

      <Footer />
    </>
  );
};

function Loader() {
  return (
    <div className="bg-gray-200 animate-pulse px-2 py-2 border-2 w-[290px] h-[270px] rounded relative cursor-pointer">
      <div className="h-[140px] bg-gray-300 rounded"></div>

      <div className="absolute top-3 right-3 bg-white p-2 rounded-full cursor-pointer">
        {/* Show a loading icon */}
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
      </div>

      <div className="px-2 py-2 mt-4">
        {/* Show loading text */}
        <div className="h-4 bg-gray-300 w-3/4 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-300 w-1/2 rounded animate-pulse mt-1"></div>
        <div className="h-4 bg-gray-300 w-2/3 rounded animate-pulse mt-1"></div>
        <div className="h-4 bg-gray-300 w-1/4 rounded animate-pulse mt-1"></div>
      </div>
    </div>
  );
}

export default Home;
