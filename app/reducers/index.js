import Axios from "axios";

const initialState = {
  Crypto: []
};

const GET_CRYPTO = "GET_CRYPTO";

export const getCrypto = pair => {
  return {
    type: GET_CRYPTO,
    pair
  };
};

export let getCryptoThunk = pair => {
  return async dispatch => {
    console.log(pair);
    const binance = await Axios.get(`/api/binance/${pair}`);
    const bittrex = await Axios.get(`/api/bittrex/${pair}`);
    const kucoin = await Axios.get(`/api/kucoin/${pair}`);
    const polo = await Axios.get(`/api/polo/${pair}`);
    // console.log(data); instead of all at once can hyou do one at a time?
    const allExchange = {
      binance: binance.data,
      bittrex: bittrex.data,
      kucoin: kucoin.data,
      polo: polo.data
    };
    console.log("PROMISE", allExchange);
    dispatch(getCrypto(allExchange));
    //
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CRYPTO:
      return { ...state, Crypto: action.pair };
    default:
      return state;
  }
};

export default rootReducer;
