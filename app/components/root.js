import React from "react";
import CryptoMatrix from "./CryptoMatrix";
import Nav from "./Nav"
//import crypto from "../../server/api/crypto";

const Root = () => {
  return (
    <div className="example1">
      {/* <nav><h1>Welcome to the Crypto Matrix</h1></nav> */}
      <Nav></Nav>
      <main>

        <h3>Sourcecode available at: <a href="https://github.com/dlanoff/cryptoMatrix">https://github.com/dlanoff/cryptoMatrix</a></h3>
        <CryptoMatrix />
      </main>
    </div>
  );
};

export default Root;
