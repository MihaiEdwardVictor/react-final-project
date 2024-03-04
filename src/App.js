import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import  HomePage  from "./pages/HomePage";
import  PageNotFound  from "./pages/PageNotFound";
import Favorites from "./pages/Favorites";
import  MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="*" element={<PageNotFound/>}/>
          <Route path="/movie/:id" element={<MovieDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
  