import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import "./App.css";
import  HomePage  from "./pages/HomePage";
import  PageNotFound  from "./pages/PageNotFound";
import Favorites from "./pages/Favorites";
import  MovieDetails from "./components/MovieDetails";
import Navbar from "./components/NavBar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/react-final-project/" element={<HomePage/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/movie/:id" element={<MovieDetails/>} />
          <Route path="/" element={<Navbar />} />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
