import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminGate from "./pages/AdminGate";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden font-body bg-cream text-gray-700">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/san-pham" element={<Products />} />
        <Route path="/gioi-thieu" element={<About />} />
        <Route path="/lien-he" element={<Contact />} />
        
        <Route path="/quan-ly" element={<AdminGate />} />
      </Routes>
      <Footer />
    </div>
  );
}
