import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/AnShop-logo.png";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="py-6 border-b border-rose/30 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">

        {/* LOGO */}
        <img src={Logo} alt="Logo" className="h-12"/>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-8 text-rose-light font-medium text-sm">
          <Link className="hover:text-rose" to="/">Trang chủ</Link>
          <Link className="hover:text-rose" to="/san-pham">Sản phẩm</Link>
          <Link className="hover:text-rose" to="/gioi-thieu">Giới thiệu</Link>
          <Link className="hover:text-rose" to="/lien-he">Liên hệ</Link>
        </nav>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className="md:hidden text-rose"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div
        className={`md:hidden bg-white border-b border-rose/20 overflow-hidden transition-all duration-300 ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-4 py-4 px-6 text-rose-light font-medium text-base">
          <Link onClick={() => setOpen(false)} className="hover:text-rose" to="/">Trang chủ</Link>
          <Link onClick={() => setOpen(false)} className="hover:text-rose" to="/san-pham">Sản phẩm</Link>
          <Link onClick={() => setOpen(false)} className="hover:text-rose" to="/gioi-thieu">Giới thiệu</Link>
          <Link onClick={() => setOpen(false)} className="hover:text-rose" to="/lien-he">Liên hệ</Link>
        </nav>
      </div>
    </header>
  );
}
