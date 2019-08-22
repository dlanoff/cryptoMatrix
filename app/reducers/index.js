import Axios from "axios";

const initialState = {
  Crypto: [],
  marquee: []
};

const GET_CRYPTO = "GET_CRYPTO";
const GET_MARQUEE = "GET_MARQUEE";

export const getCrypto = pair => {
  return {
    type: GET_CRYPTO,
    pair
  };
};

export const getMarquee = (payload) => {
  return {
    type: GET_MARQUEE,
    payload
  };
};

export let getCryptoThunk = pair => {
  return async dispatch => {
    console.log(pair);
    const binance = await Axios.get(`/api/binance/${pair}`);
    const bittrex = await Axios.get(`/api/bittrex/${pair}`);
    const kucoin = await Axios.get(`/api/kucoin/${pair}`);
    const polo = await Axios.get(`/api/polo/${pair}`);
    const kraken = await Axios.get(`/api/kraken/${pair}`);
    // console.log(data); instead of all at once can hyou do one at a time?
    const allExchange = {
      binance: binance.data,
      bittrex: bittrex.data,
      kucoin: kucoin.data,
      polo: polo.data,
      kraken: kraken.data
    };
    console.log("PROMISE", allExchange);
    dispatch(getCrypto(allExchange));
    //
  };
};

export let getMarqueeThunk = () => {
  return async dispatch => {
    const marquee = await Axios.get('/api/getmarquee')
    // console.log(marquee.data, 'DATAAAAA')
    dispatch(getMarquee(marquee))
  }
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CRYPTO:
      return { ...state, Crypto: action.pair };
    case GET_MARQUEE:
      return { ...state, marquee: action.payload }
    default:
      return state;
  }
};

export default rootReducer;
