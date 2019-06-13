import React from "react";
import CryptoMatrix from "./CryptoMatrix";
//import crypto from "../../server/api/crypto";

const Root = () => {
  return (
    <div>
      <nav />
      <main>
        <h1>Welcome to the Crypto Matrix</h1>
        <CryptoMatrix />
      </main>
    </div>
  );
};

export default Root;
