import React from "react";
import { FiMenu } from "react-icons/fi";

interface HeaderProps {
  toggleSidebar: () => void;
  resetState: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, resetState }) => (
  <div className="p-4 bg-blue-500 text-white flex items-center justify-between">
    <button onClick={toggleSidebar} className="text-2xl">
      <FiMenu />
    </button>
    <h1
      className="text-3xl font-bold text-center flex-grow cursor-pointer"
      onClick={resetState}
    >
      Lang 2 SynthV
    </h1>
  </div>
);

export default Header;
