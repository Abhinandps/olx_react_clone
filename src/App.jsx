import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import { FirebaseContextProvider } from "./context/FirebaseContext";
import Post from "./pages/Post";
import View from "./pages/View";
import { PostContextProvider } from "./context/postContext";
import Protected from "./components/Protected";
import { SearchContextProvider } from "./context/SearchContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <PostContextProvider>
          <FirebaseContextProvider>
            <SearchContextProvider>

              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/post"
                  element={
                    <Protected>
                      <Post />
                    </Protected>
                  }
                />
                <Route path="/view" element={<View />} />
              </Routes>

            </SearchContextProvider>
          </FirebaseContextProvider>
        </PostContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
