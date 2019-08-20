import React from "react";
import CryptoMatrix from "./CryptoMatrix";
//import crypto from "../../server/api/crypto";

const Root = () => {
  return (
    <div>
      <nav><h1>Welcome to the Crypto Matrix</h1></nav>
      <main>
        <h3>Sourcecode available at: <a href="https://github.com/dlanoff/cryptoMatrix">https://github.com/dlanoff/cryptoMatrix</a></h3>
        <CryptoMatrix />
      </main>
    </div>
  );
};

export default Root;
