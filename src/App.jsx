import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import { FirebaseContextProvider } from "./context/FirebaseContext";
import Post from "./pages/Post";
import View from "./pages/View";
import { PostContextProvider } from "./context/postContext";
import Protected from "./components/Protected";

function App() {
  return (
    <>
      <AuthContextProvider>
        <PostContextProvider>
         
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/post"
                element={
                  <FirebaseContextProvider>
                    <Protected>
                      <Post />
                    </Protected>
                  </FirebaseContextProvider>
                }
              />
              <Route path="/view" element={<View />} />
            </Routes>
        
        </PostContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
