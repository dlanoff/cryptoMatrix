import React, { Component } from "react";
import { getCryptoThunk } from "../reducers/index"; //TODO, MAKE THUNK
import { connect } from "react-redux";
import AskBidSpread from "./AskBidSpread";
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
    const { binance, kucoin, bittrex, polo } = this.props.Crypto;
    let maxDiff;
    let percentDiff;
    if (binance && kucoin && bittrex && polo) {
      //calculate minimum Bid
      //*** */
      let bids = { Binance: binance.bid, Kucoin: kucoin.bid, Bittrex: bittrex.bid, Polo: polo.bid }
      let currMin = Infinity;
      for (let bid in bids) {
        console.log(bids[bid], bid)
        if (bids[bid] < currMin) currMin = [bids[bid], bid]
      }
      //Calculate maximum Ask
      let currMax = -Infinity;
      let asks = { Binance: binance.ask, Kucoin: kucoin.ask, Bittrex: bittrex.ask, Polo: polo.ask }
      for (let ask in asks) {
        console.log(asks[ask], ask, 'CURRMAX!!!!', console.log(currMax))
        //TODO: Not correclty evaluating currMax, staying as -infinity
        if (asks[ask] >= currMax) {
          currMax = [asks[ask], ask]
          // console.log('here')
        }
      }
      const bidArr = Math.min(binance.bid, kucoin.bid, bittrex.bid, polo.bid);
      const askArr = Math.max(binance.ask, kucoin.ask, bittrex.ask, polo.ask);
      maxDiff = askArr - bidArr;
      maxDiff = maxDiff.toFixed(6);
      percentDiff = ((1 - (bidArr / askArr)) * 100).toFixed(4)

      console.log('PERCENT DIFF: ', percentDiff, "max Diff", maxDiff, 'bid :', bidArr, 'ask: ', askArr);
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
        <AskBidSpread max={maxDiff} percent={percentDiff} pair={this.state.value} reset={this.state.reset} />
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
