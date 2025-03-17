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
  <section className="p-6 flex flex-col items-center">
    <textarea
      className="
        w-full
        max-w-2xl
        p-3
        border
        border-[#C6C6C6]
        rounded-md
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-[#7DB235]
        resize-none
      "
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter text (language auto-detect)"
      maxLength={100}
      rows={4}
    />
    <p className="text-sm text-gray-500 mt-2">{input.length}/100</p>
    <button
      className="
        mt-4
        bg-[#7DB235]
        text-white
        px-8
        py-2
        rounded-full
        shadow-md
        hover:bg-[#6CA12C]
        transition
        transform
        hover:scale-105
      "
      onClick={handleConvert}
    >
      Convert
    </button>
  </section>
);

export default InputSection;
