import React, { Component } from "react";
import { getCryptoThunk } from "../reducers/index"; //TODO, MAKE THUNK
import { connect } from "react-redux";
import AskBidSpread from "./AskBidSpread";
import InterexchangeSpread from "./InterexchangeSpread"

class CryptoMatrix extends Component {
  constructor() {
    super()
    this.state = {
      currentCrypto: [],
      started: true,
      value: 'ZEC',
      intervalId: '',
      reset: false
    }
  }

  componentDidMount() {
    this.startTimer();
    this.props.getCrypto("ZEC");
    //
  }

  //.65 => .35    //.185 low
  //BId and ask switch => plot both! new metric? spread between reversed bid ask and vice versa
  startTimer(start = false, pair = 'ZEC') {
    console.log('CLEARED')

    var intervalId = setInterval(() => this.props.getCrypto(pair), 2000);
    this.setState({ intervalId: intervalId })
    setTimeout(() => {
      this.setState({ reset: false })
    }, 2000)
  }
  handleChange = (event) => {
    clearInterval(this.state.intervalId)
    this.setState({ value: event.target.value });
    this.setState({ reset: true })
    console.log('EVENT CHANGE:!!!!!!!!!!!!!!', event.target.value)
    this.startTimer(true, event.target.value)
  }
  render() {
    // console.log("!!!!!!", this.props.Crypto);
    const { binance, kucoin, bittrex, polo, kraken } = this.props.Crypto;
    let maxDiff;
    let percentDiff;
    let currMin = Infinity;
    let currMax = -Infinity
    let bidArr = []
    let askArr = []
    let asks;
    let bids;
    if (binance && kucoin && bittrex && polo && kraken) {
      //calculate max Bid
      //*** */
      bids = { Binance: binance.bid, Kucoin: kucoin.bid, Bittrex: bittrex.bid, Polo: polo.bid, Kraken: kraken.bid }


      for (let bid in bids) {
        console.log('BIDS:', bids[bid], bid)
        if (bids[bid] >= currMax) currMax = [bids[bid], bid]
      }

      //Calculate min Ask
      asks = { Binance: binance.ask, Kucoin: kucoin.ask, Bittrex: bittrex.ask, Polo: polo.ask, Kraken: kraken.ask }
      for (let ask in asks) {
        console.log('ASKS @ ASK', asks[ask], ask)
        if (asks[ask] <= currMin) {
          currMin = [asks[ask], ask]
        }
      }
      console.log('MAX:', currMax, 'MIN:', currMin)

      //BUY FOR 10 ASK
      //SELL FOR 15 BID
      //bid - ask
      // const bidArr = Math.min(kucoin.bid);
      bidArr = Math.max(binance.bid, kucoin.bid, bittrex.bid, polo.bid, kraken.bid);
      askArr = Math.min(binance.ask, kucoin.ask, bittrex.ask, polo.ask, kraken.ask);
      const krakenAskArr = kraken.ask

      maxDiff = bidArr - askArr;
      maxDiff = maxDiff.toFixed(6);
      percentDiff = ((1 - (askArr / bidArr)) * 100).toFixed(6)

      console.log('PERCENT DIFF: ', percentDiff, "max Diff", maxDiff, 'bid :', bidArr, 'AAAsk: ', askArr);
      //0.16%	0.26% [.42 percent for kraken + .02 for opening, .02 per 4 hours  .46 total] .46 + .2 for kucoin = .66 |
      // console.log('PERCENT DIFF: ', percentDiff, "max Diff", maxDiff, bidArr, 'CURRMIN', currMax, 'CURRMAX');

    }

    //TODO: START HERE
    // onChange={this.change} value={this.state.value}
    return (
      <div>
        <table className="outerTable">
          <thead>
            <tr>
              <th>
                <select value={this.state && this.state.value} onChange={this.handleChange}>
                  <option value="LTC">BTC-LTC</option>
                  <option value="ETH">BTC-ETH</option>
                  <option value="ZEC">BTC-ZEC</option>
                  <option value="XRP">BTC-XRP</option>
                  <option value="ETC">BTC-ETC</option>
                  <option value="XMR">BTC-XMR</option>
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
                      <th>Bid Binance: {binance && binance.bid}</th>
                      <th className="selected">
                        SPREAD:{" "}
                        {binance &&
                          kucoin &&
                          (kucoin.bid - binance.ask).toFixed(6)}
                      </th>
                      <th>Ask kucoin: {kucoin && kucoin.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Bid Binance: {binance && binance.bid}</th>
                      <th className="selected">
                        SPREAD:{" "}
                        {binance &&
                          kucoin &&
                          (bittrex.bid - binance.ask).toFixed(6)}
                      </th>
                      <th>Ask bittrex: {bittrex && bittrex.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Bid Binance: {binance && binance.bid}</th>
                      <th className="selected">
                        SPREAD:{" "}
                        {binance &&
                          kucoin &&
                          (polo.bid - binance.ask).toFixed(6)}
                      </th>
                      <th>Ask polo: {polo && polo.ask}</th>
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
                      <th>Bid Ku: {kucoin && kucoin.bid}</th>
                      <th>Ask Binance: {binance && binance.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td className="blackOut">X</td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Bid Ku: {kucoin && kucoin.bid}</th>
                      <th>Ask Bittrex: {bittrex && bittrex.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Bid Ku: {kucoin && kucoin.bid}</th>
                      <th>Ask Polo: {polo && polo.ask}</th>
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
                      <th>Bid Bittrex: {bittrex && bittrex.bid}</th>
                      <th>Ask Binance: {binance && binance.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Bid Bittrex: {bittrex && bittrex.bid}</th>
                      <th>Ask Kucoin: {kucoin && kucoin.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td className="blackOut">X</td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Bid Bittrex: {bittrex && bittrex.bid}</th>
                      <th>Ask Polo: {polo && polo.ask}</th>
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
                      <th>Bid polo: {polo && polo.bid}</th>
                      <th>Ask Bi: {binance && binance.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Bid polo: {polo && polo.bid}</th>
                      <th>Ask Ku: {kucoin && kucoin.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td>
                <table className="inner">
                  <thead>
                    <tr>
                      <th>Bid polo: {polo && polo.bid}</th>
                      <th>Ask bittrex: {bittrex && bittrex.ask}</th>
                    </tr>
                  </thead>
                </table>
              </td>
              <td className="blackOut">Inner Spread - </td>
            </tr>
          </tbody>
        </table>
        )
        <AskBidSpread currMin={currMin} currMax={currMax} max={maxDiff} percent={percentDiff} pair={this.state.value} reset={this.state.reset} />
        <InterexchangeSpread bidArr={bids} askArr={asks} currMin={currMin} currMax={currMax} max={maxDiff} percent={percentDiff} pair={this.state.value} reset={this.state.reset} />
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
