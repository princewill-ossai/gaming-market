import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Listings from "./Pages/Listings";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Upload from "./Pages/Upload";

function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;