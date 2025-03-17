"use client";
import Image from "next/image";
import mascort from "../public/mascort.png";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import InputSection from "./components/InputSection";
import Loader from "./components/Loader";
import ResultsTable from "./components/ResultsTable";

interface ConversionResult {
  ipa: string;
  synthv: string[];
}

interface HistoryItem {
  input: string;
  results: ConversionResult[];
}

export default function IPAConverter() {
  const [input, setInput] = useState<string>(""); // 입력값 상태
  const [results, setResults] = useState<ConversionResult[]>([]); // 변환 결과 상태
  const [history, setHistory] = useState<HistoryItem[]>([]); // 변환 이력 상태
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false); // 사이드바 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("ipaHistory") || "[]");
    setHistory(savedHistory);
  }, []);

  // 서버로 변환 요청
  const handleConvert = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/convert`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (response.ok) {
        const data = await response.json();

        setResults(data.synthv);

        const updatedHistory = [
          { input, results: data.synthv },
          ...history.filter((item) => item.input !== input).slice(0, 9),
        ];
        setHistory(updatedHistory);
        localStorage.setItem("ipaHistory", JSON.stringify(updatedHistory));
      } else {
        console.error("Error: Failed to fetch conversion results.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const resetState = () => {
    setInput("");
    setResults([]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Copied to clipboard:", text);
      },
      (err) => {
        console.error("Failed to copy:", err);
      }
    );
  };

  return (
    <div className="flex h-full">
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        history={history}
        setInput={setInput}
        setResults={setResults}
        setHistory={setHistory}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} resetState={resetState} />
        <main className="p-4 bg-gray-300">
          <InputSection
            input={input}
            setInput={setInput}
            handleConvert={handleConvert}
          />
          {loading && <Loader />}
          {!loading && results.length > 0 && (
            <ResultsTable results={results} copyToClipboard={copyToClipboard} />
          )}
        </main>
        <div
          style={{
            width: "0px",
            height: "0px",
            marginLeft: "20%",
            borderTop: "150px solid rgb(209 213 219 / var(--tw-bg-opacity, 1))",
            borderLeft: "240px solid transparent",
            borderRight: "90px solid transparent",
          }}
        ></div>
        <Image
          width={650}
          height={650}
          src={mascort}
          className="m-auto"
          alt="Picture of the mascort"
        />
      </div>
    </div>
  );
}
