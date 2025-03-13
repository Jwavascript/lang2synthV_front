import React from "react";

interface ResultsTableProps {
  results: { ipa: string; synthv: string[] }[];
  copyToClipboard: (text: string) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  results,
  copyToClipboard,
}) => {
  return (
    <div className="p-6 flex justify-center">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                IPA
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                SynthV
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {result.ipa}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {result.synthv.map((synthv, synthvIndex) => (
                    <span
                      key={synthvIndex}
                      className="cursor-pointer text-blue-500 hover:underline"
                      onClick={() => {
                        const synthvText = synthv.split(" (")[0];
                        copyToClipboard(synthvText);
                      }}
                    >
                      {synthv}
                      {synthvIndex < result.synthv.length - 1 && ", "}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
