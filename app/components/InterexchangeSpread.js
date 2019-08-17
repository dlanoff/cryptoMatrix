import React, { Component } from "react";
import { cloneDeep } from "lodash";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
export default class AskBidSpread extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  timeTicket = null;
  getInitialState = () => ({ option: this.getOption() });

  fetchNewDate = () => {
    console.log(this.props, 'BIDARR IN COMPONENT');
    let axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");

    const option = cloneDeep(this.state.option); // immutable
    // const option = Object.assign({}, this.state.option);
    option.title.text =
      this.props.pair + ": " + "Maximum Inter-exchange Spread " + this.props.percent + "% || " + this.props.max + " BTC" + ' || ' + 'Minimum Ask Exchange: ' + this.props.currMin[1] + ' || ', +
      'Maximum Bid Exchange: ' + this.props.currMax

    //Binance Bids
    let binanceBids = option.series[0].data;
    binanceBids.shift();
    binanceBids.push(this.props.bidArr.Binance);


    let poloBids = option.series[1].data;
    poloBids.shift();
    poloBids.push(this.props.bidArr.Polo);


    let krakenBids = option.series[2].data;

    krakenBids.shift();
    krakenBids.push(this.props.bidArr.Kraken);


    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    if (this.props.reset === true) {
      for (let i = 0; i < 51; i++) {
        data0.shift();
        data0.push(0);
      }
      console.log('RESET!!!!!!!!!!!!!!!!!!')
    }

    this.setState({
      option
    });
  };

  componentDidMount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
    this.timeTicket = setInterval(this.fetchNewDate, 1000);
  }

  componentWillUnmount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
  }

  getOption = () => ({
    backgroundColor: "#404A59",
    color: ['#ffd285', '#ff733f', '#ec4863'],

    title: [{
      text: this.props.text,
      left: '1%',
      top: '6%',
      textStyle: {
        color: '#fff'
      }
    }],
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x: 300,
      top: '7%',
      textStyle: {
        color: '#ffd285',
      },
      data: ['Binance', 'Poloniex', 'Kraken']
    },
    grid: {
      left: '8%',
      right: '8%',
      top: '16%',
      bottom: '6%',
      containLabel: true
    },
    toolbox: {
      "show": false,
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#FF4500'
          }
        },
        data: (function () {
          let now = new Date();
          let res = [];
          let len = 50;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
            now = new Date(now - 2000);
            console.log(now);
          }
          return res;
        })()
      }
    ],
    yAxis: {
      "axisLine": {
        lineStyle: {
          color: '#fff'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#fff'
        }
      },
      "axisTick": {
        "show": true
      },
      axisLabel: {
        textStyle: {
          color: '#fff'
        }
      },
      type: 'value',
      min: 'dataMin',
      max: 'dataMax'
    },
    series: [{
      name: 'Binance',
      smooth: true,
      type: 'line',
      symbolSize: 8,
      symbol: 'circle',
      data: (function () {
        let res = [];
        let len = 50;
        while (len--) {
          res.push(0);
        }

        return res;
      })()
    }, {
      name: 'Poloniex',
      smooth: true,
      type: 'line',
      symbolSize: 8,
      symbol: 'circle',
      data: (function () {
        let res = [];
        let len = 50;
        while (len--) {
          res.push(0);
        }

        return res;
      })()
    }, {
      name: 'Kraken',
      smooth: true,
      type: 'line',
      symbolSize: 8,
      symbol: 'circle',
      data: (function () {
        let res = [];
        let len = 50;
        while (len--) {
          res.push(0);
        }

        return res;
      })()
    }]
  });

  render() {
    let code =
      "<ReactEcharts ref='echartsInstance' \n" +
      "  option={this.state.option} />\n";
    return (
      <div className="examples">
        <div className="parent">
          <ReactEcharts
            ref="echarts_react"
            option={this.state.option}
            style={{ height: 400 }}
          />

          <pre>
            {/* <code>{code}</code> */}
          </pre>
        </div>
      </div>
    );
  }
}
