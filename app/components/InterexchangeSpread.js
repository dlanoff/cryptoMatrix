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
  count = 51;
  getInitialState = () => ({ option: this.getOption() });

  fetchNewDate = () => {
    console.log(this.props);
    let axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");

    const option = cloneDeep(this.state.option); // immutable
    // const option = Object.assign({}, this.state.option);
    option.title.text =
      this.props.pair + ": " + "Maximum Inter-exchange Spread " + this.props.percent + "% || " + this.props.max + " BTC" + ' || ' + 'Minimum Ask Exchange: ' + this.props.currMin[1] + ' || ', +
      'Maximum Bid Exchange: ' + this.props.currMax
    let data0 = option.series[0].data;
    // let data1 = option.series[1].data;
    // let newArr = []
    // newArr = Array(50).fill(0);                // [4, 4, 4]
    data0.shift();
    data0.push(this.props.percent);


    // data1.shift();
    // data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    option.xAxis[1].data.shift();
    option.xAxis[1].data.push(this.count++);
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
      text: '城市宝周新增用户报表',
      left: '1%',
      top: '6%',
      textStyle: {
        color: '#fff'
      }
    }, {
      text: '用户来源占比',
      left: '83%',
      top: '6%',
      textAlign: 'center',
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
      data: ['在大理', '标准版', '潍V']
    },
    grid: {
      left: '1%',
      right: '35%',
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
      },
      {
        type: "category",
        boundaryGap: true,
        data: (function () {
          let res = [];
          let len = 50;
          while (len--) {
            res.push(50 - len + 1);
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
      type: 'value'
    },
    series: [{
      name: '在大理',
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
      name: '标准版',
      smooth: true,
      type: 'line',
      symbolSize: 8,
      symbol: 'circle',
      data: [70, 50, 50, 87, 90, 80, 70]
    }, {
      name: '潍V',
      smooth: true,
      type: 'line',
      symbolSize: 8,
      symbol: 'circle',
      data: [290, 200, 20, 132, 15, 200, 90]
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
