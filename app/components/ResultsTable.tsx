import React from "react";

interface ResultsTableProps {
  results: { ipa: string; synthv: string[] }[];
  copyToClipboard: (text: string) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  results,
  copyToClipboard,
}) => {
  const colors = ["bg-blue-100", "bg-green-100", "bg-yellow-100"];
  let groupIndex = 0;

  return (
    <div className="p-6 flex justify-center">
      <table className="table-auto w-full max-w-3xl border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">IPA</th>
            <th className="border px-4 py-2">SynthV</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => {
            const colorClass =
              result.ipa === " "
                ? "bg-gray-200"
                : colors[groupIndex % colors.length];

            if (result.ipa === " ") {
              groupIndex++;
            }

            return (
              <tr key={index} className={colorClass}>
                <td className="border px-4 py-2">{result.ipa}</td>
                <td className="border px-4 py-2">
                  {result.synthv.map((synthv, synthvIndex) => (
                    <span
                      key={synthvIndex}
                      className="cursor-pointer hover:bg-gray-300"
                      onClick={() => {
                        const synthvText = synthv.split(" (")[0];
                        console.log("Clicked:", synthvText);
                        copyToClipboard(synthvText);
                      }}
                    >
                      {synthv}
                      {synthvIndex < result.synthv.length - 1 && ", "}
                    </span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
