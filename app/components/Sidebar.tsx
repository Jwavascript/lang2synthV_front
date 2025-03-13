import React from "react";
import { FiX } from "react-icons/fi";

interface ConversionResult {
  ipa: string;
  synthv: string[];
}

interface HistoryItem {
  input: string;
  results: ConversionResult[];
}

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  history: HistoryItem[];
  setInput: (input: string) => void;
  setResults: (results: ConversionResult[]) => void;
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  toggleSidebar,
  history,
  setInput,
  setResults,
  setHistory,
}) => (
  <aside
    className={`bg-gray-900 text-white w-64 p-6 fixed h-full transition-transform duration-300 z-50 ${
      sidebarOpen ? "translate-x-0" : "-translate-x-64"
    }`}
  >
    <button
      onClick={toggleSidebar}
      className="mb-6 text-white text-2xl focus:outline-none"
    >
      <FiX />
    </button>
    <h2 className="text-xl font-semibold mb-4">Conversion History</h2>
    <ul className="space-y-3">
      {history.map((item, index) => (
        <li
          key={index}
          className="flex justify-between items-center bg-gray-800 p-2 rounded"
        >
          <span
            className="cursor-pointer underline hover:text-blue-400"
            onClick={() => {
              setInput(item.input);
              setResults(item.results);
            }}
          >
            {item.input}
          </span>
          <button
            onClick={() =>
              setHistory((prev: HistoryItem[]) =>
                prev.filter((_, i) => i !== index)
              )
            }
            className="text-red-400 hover:text-red-500 focus:outline-none"
          >
            <FiX />
          </button>
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;
