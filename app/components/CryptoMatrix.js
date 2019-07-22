import React, { Component } from "react";
import { getCryptoThunk } from "../reducers/index"; //TODO, MAKE THUNK
import { connect } from "react-redux";
import AskBidSpread from "./AskBidSpread";
class CryptoMatrix extends Component {
  constructor() {
    super();
    state: {
      currentCrypto: [];
      started: true;
    }
  }

  componentDidMount() {
    // this.startTimer();
    //TODO: YOU ADDED LTC BTC BECAUSE YOU WANTED TO DO THE DROPDOWN MENU BUT INSTEAD ITS CAUSING ERRORS< JUST GO BACK TO HARDCODING IT IN THE BACKEND FOR IT TO WORK
    // this.props.getCrypto("LTC");
  }


  startTimer(start = false) {

    if (start === true) {
      clearInterval(test)
      console.log('CLEARED')
      start = false;
    }
    var test = setInterval(() => this.getCrypto(), 5000);
  }
  change(event) {
    this.setState({ value: event.target.value });
  }
  getCrypto() {
    console.log('get crypto separate function')
    this.props.getCrypto('ZEC')
  }
  render() {
    console.log("!!!!!!", this.props.Crypto);
    const { binance, kucoin, bittrex, polo } = this.props.Crypto;
    let maxDiff;
    if (binance && kucoin && bittrex && polo) {
      const bidArr = Math.min(binance.bid, kucoin.bid, bittrex.bid, polo.bid);
      const askArr = Math.max(binance.ask, kucoin.ask, bittrex.ask, polo.ask);
      maxDiff = askArr - bidArr;
      maxDiff = maxDiff.toFixed(6);
      console.log("max Diff", maxDiff);
    }

    //TODO: START HERE
    // onChange={this.change} value={this.state.value}
    return (
      <div>
        <table className="outerTable">
          <thead>
            <tr>
              <th>
                <select onChange={() => this.startTimer(true)}>
                  <option value="BTC-LTC">BTC-LTC</option>
                  <option value="BTC-ETH">BTC-ETH</option>
                  <option value="BTC-BNB">BTC-BNB</option>
                  <option value="BTC-EOS">BTC-EOS</option>
                </select>
                {maxDiff && maxDiff}
              </th>
              <th>BINANCE</th>
              <th>KUCOIN</th>
              <th>BITTREX</th>
              <th>POLONIEX</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BINANCE</td>

              <td className="blackOut">X</td>

              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Buy Bid Binance: {binance && binance.bid}</th>
                      <th className="selected">
                        SPREAD:{" "}
                        {binance &&
                          kucoin &&
                          (kucoin.ask - binance.bid).toFixed(6)}
                      </th>
                      <th>Sell Ask kucoin: {kucoin && kucoin.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Buy Bid Binance: {binance && binance.bid}</th>
                      <th className="selected">
                        SPREAD:{" "}
                        {binance &&
                          kucoin &&
                          (bittrex.ask - binance.bid).toFixed(6)}
                      </th>
                      <th>Sell Ask bittrex: {bittrex && bittrex.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Buy Bid Binance: {binance && binance.bid}</th>
                      <th className="selected">
                        SPREAD:{" "}
                        {binance &&
                          kucoin &&
                          (polo.ask - binance.bid).toFixed(6)}
                      </th>
                      <th>Sell Ask polo: {polo && polo.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
            </tr>
            <tr>
              <td>KUCOIN</td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Buy Bid Ku: {kucoin && kucoin.bid}</th>
                      <th>Sell Ask Binance: {binance && binance.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td className="blackOut">X</td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Buy Bid Ku: {kucoin && kucoin.bid}</th>
                      <th>Sell Ask Bittrex: {bittrex && bittrex.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Buy Bid Ku: {kucoin && kucoin.bid}</th>
                      <th>Sell Ask Polo: {polo && polo.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
            </tr>
            <tr>
              <td>BITTREX</td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Buy Bid Bittrex: {bittrex && bittrex.bid}</th>
                      <th>Sell Ask Binance: {binance && binance.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Buy Bid Bittrex: {bittrex && bittrex.bid}</th>
                      <th>Sell Ask Ku: {kucoin && kucoin.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td className="blackOut">X</td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Buy Bid Bittrex: {bittrex && bittrex.bid}</th>
                      <th>Sell Ask Polo: {polo && polo.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
            </tr>
            <tr>
              <td>POLONIEX</td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Buy Bid polo: {polo && polo.bid}</th>
                      <th>Sell Ask Bi: {binance && binance.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Buy Bid polo: {polo && polo.bid}</th>
                      <th>Sell Ask Ku: {kucoin && kucoin.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Buy Bid polo: {polo && polo.bid}</th>
                      <th>Sell Ask bittrex: {bittrex && bittrex.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td className="blackOut">X</td>
            </tr>
          </tbody>
        </table>
        )
        <AskBidSpread max={maxDiff} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Crypto: state.Crypto
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCrypto: pair => dispatch(getCryptoThunk(pair))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CryptoMatrix);
