"use client";
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

    setLoading(true); // 로딩 시작

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/convert`;

      // 백엔드 API 요청
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (response.ok) {
        const data = await response.json(); // 응답 데이터 파싱

        console.log(data); // 데이터 구조 확인용 콘솔 로그
        setResults(data.synthv); // SynthV 변환 결과 저장

        // 변환 이력 저장
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
      setLoading(false); // 로딩 종료
    }
  };

  // 사이드바 토글
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // 초기 상태로 리셋
  const resetState = () => {
    setInput("");
    setResults([]);
  };

  // IPA 기호 복사 기능
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
    <div className="flex h-screen">
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        history={history}
        setInput={setInput}
        setResults={setResults}
        setHistory={setHistory}
      />
      <div
        className={`flex-1 transition-all duration-300 ml-0 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} resetState={resetState} />
        <InputSection
          input={input}
          setInput={setInput}
          handleConvert={handleConvert}
        />
        {loading && <Loader />}
        {!loading && results.length > 0 && (
          <ResultsTable results={results} copyToClipboard={copyToClipboard} />
        )}
      </div>
    </div>
  );
}
