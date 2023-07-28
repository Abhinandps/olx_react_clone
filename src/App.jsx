import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import { FirebaseContextProvider } from "./context/FirebaseContext";
import Post from "./pages/Post";
import View from "./pages/View";

function App() {
  return (
    <>
      <AuthContextProvider>
        <FirebaseContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </FirebaseContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
