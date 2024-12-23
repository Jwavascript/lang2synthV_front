import React from "react";

interface InputSectionProps {
  input: string;
  setInput: (input: string) => void;
  handleConvert: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  input,
  setInput,
  handleConvert,
}) => (
  <div className="p-6 flex flex-col items-center">
    <textarea
      className="border p-2 w-full max-w-2xl mb-4"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter text (language auto-detect)"
      maxLength={100}
    />
    <p className="text-sm text-gray-600 mb-4">{input.length}/100</p>
    <button
      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      onClick={handleConvert}
    >
      Convert
    </button>
  </div>
);

export default InputSection;
