import Header from "./components/Header/Header";
import Main from "./pages/Main"
import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About/About";
import MossFooter from "./components/MossFooter";
import Resources from "./pages/Resources/Resources";
import Footer from "./components/Footer/footer";
import Map from "./pages/Map/Map";

function App() {



  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />}/>
        <Route path="/map" element={<Map />}/>
      </Routes>
    </div>
  );
}

export default App;
