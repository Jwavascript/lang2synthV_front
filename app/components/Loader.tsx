import React from "react";

const Loader: React.FC = () => (
  <div className="flex justify-center items-center">
    <div className="loader">Loading...</div>
    <div className="loader">The first request can take ~1 minute.</div>
  </div>
);

export default Loader;
