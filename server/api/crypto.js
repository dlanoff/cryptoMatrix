const express = require("express");
const router = require("express").Router();
const Axios = require("axios");

// const WebSocket = require("ws");

// const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

// ws.on("message", function incoming(data) {
//   console.log(data);
// });
//LTCBTC for binance format
//IDEX FORMAT: https://api.idex.market/returnTicker?market=ETH_DENT
router.get("/binance/:pair", async (req, res, next) => {
  try {
    const pair = req.params.pair;
    const { data } = await Axios.get(
      `https://api.binance.com/api/v1/depth?symbol=${pair}BTC`
    );
    const newData = { ask: data.asks[0][0], bid: data.bids[0][0] };
    console.log("!!!!", newData);
    // console.log(newData, "!!!!!!!!!!!!!!!!");
    res.send(newData);
  } catch (error) {
    next(error);
  }
});

router.get("/bittrex/:pair", async (req, res, next) => {
  const pair = req.params.pair;

  const { data } = await Axios.get(
    `https://api.bittrex.com/api/v1.1/public/getorderbook?market=BTC-${pair}&type=both`
  );
  const newData = {
    ask: data.result.sell[0].Rate,
    bid: data.result.buy[0].Rate
  };
  // console.log("!!!!!!!!!!!!!", newData);
  res.send(newData);
});

router.get("/kucoin/:pair", async (req, res, next) => {
  const pair = req.params.pair;

  const { data } = await Axios.get(
    `https://api.kucoin.com/api/v1/market/orderbook/level2_100?symbol=${pair}-BTC`
  );
  const newData = {
    ask: data.data.asks[0][0],
    bid: data.data.bids[0][0]
  };
  res.send(newData);
});
//https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=1

router.get("/polo/:pair", async (req, res, next) => {
  const pair = req.params.pair;

  const { data } = await Axios.get(
    `https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_${pair}&depth=1`
  );
  const newData = {
    ask: data.asks[0][0],
    bid: data.bids[0][0]
  };
  res.send(newData);
});

module.exports = router;
