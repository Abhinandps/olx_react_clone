import { useEffect, useState } from "react";
import CategoryList from "../components/Category";
import Navbar from "../components/Navbar";
import Row from "../components/Row";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
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
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <CategoryList />
      {/* <Row title="Based on your latest search" main={true} /> */}
      <Row products={products} title="Fresh recommendations" />
    </>
  );
};

export default Home;
