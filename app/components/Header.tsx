import React from "react";
import { FiMenu } from "react-icons/fi";

interface HeaderProps {
  toggleSidebar: () => void;
  resetState: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, resetState }) => (
  <header className="p-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white flex items-center justify-between shadow-lg">
    <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
      <FiMenu />
    </button>
    <h1
      className="text-3xl font-bold text-center flex-grow cursor-pointer hover:opacity-90 transition"
      onClick={resetState}
    >
      Lang 2 SynthV
    </h1>
    <a
      href="https://jwavascript.github.io/posts/lang2SynthV-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-lg hover:underline"
    >
      How to Use
    </a>
  </header>
);

export default Header;
