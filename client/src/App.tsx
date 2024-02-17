import Header from "./components/Header/Header";
import Main from "./pages/Main"
import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About/About";
import MossFooter from "./components/MossFooter";
import Resources from "./pages/Resources/Resources";

function App() {



  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />}/>
      </Routes>
      {/* <MossFooter></MossFooter> */}
    </div>
  );
}

export default App;
