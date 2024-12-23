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
    className={`bg-gray-800 text-white w-64 p-4 transition-transform duration-300 ${
      sidebarOpen ? "translate-x-0" : "-translate-x-64"
    } fixed h-full`}
  >
    <button onClick={toggleSidebar} className="mb-4 text-white text-2xl">
      <FiX />
    </button>
    <h2 className="text-lg font-bold mb-4">Conversion History</h2>
    <ul>
      {history.map((item, index) => (
        <li key={index} className="flex justify-between items-center mb-2">
          <span
            className="cursor-pointer underline"
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
            className="text-red-400"
          >
            <FiX />
          </button>
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;
