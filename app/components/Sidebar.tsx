import React from "react";
import { FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

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
}) => {
  const handleDeleteHistoryItem = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem("ipaHistory", JSON.stringify(updatedHistory));
  };

  return (
    <aside
      className={`
        bg-[#363737]
        text-[#C6C6C6]
        w-64
        p-6
        fixed
        h-full
        transition-transform
        duration-300
        z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
      `}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
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
                className="
                  flex
                  justify-between
                  items-center
                  bg-[#2F2F2F]
                  p-2
                  rounded
                "
              >
                <span
                  className="cursor-pointer underline hover:text-[#7DB235]"
                  onClick={() => {
                    setInput(item.input);
                    setResults(item.results);
                  }}
                >
                  {item.input}
                </span>
                <button
                  onClick={() => handleDeleteHistoryItem(index)}
                  className="text-red-400 hover:text-red-500 focus:outline-none"
                >
                  <FiX />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex items-center justify-center space-x-2">
          <span className="text-sm">made by jwavascript</span>
          <a
            href="https://github.com/jwavascript"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#7DB235] text-xl"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
