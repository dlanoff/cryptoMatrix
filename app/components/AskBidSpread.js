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

    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    if (this.props.reset === true) {
      for (let i = 0; i < 51; i++) {
        data0.shift();
        data0.push(0);
      }

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
    height: '70%',
    backgroundColor: "black",
    title: {
      text: "MaxSpread",
      textStyle: {
        fontWeight: "normal",
        fontSize: 16,
        color: "white"
      },
      left: "6%"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#57617B"
        }
      }
    },
    legend: {
      icon: "rect",
      itemWidth: 14,
      itemHeight: 5,
      itemGap: 13,
      data: ["MaxSpread", "桂林-曼芭", "南宁-甲米"],
      right: "4%",
      textStyle: {
        fontSize: 12,
        color: "#F1F1F3"
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: "#57617B"
          }
        },
        data: (function () {
          let now = new Date();
          let res = [];
          let len = 50;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
            now = new Date(now - 2000);

          }
          return res;
        })()
      }
    ],
    yAxis: [
      {
        type: "value",
        axisTick: {
          show: true
        },
        axisLine: {
          lineStyle: {
            color: "#57617B"
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 14
          }
        },
        splitLine: {
          lineStyle: {
            color: "#57617B"
          }
        }
      }
    ],
    series: [
      {
        name: "MaxSpread",
        type: "line",
        smooth: true,
        lineStyle: {
          normal: {
            width: 1
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(137, 189, 27, 0.3)"
                },
                {
                  offset: 0.8,
                  color: "rgba(137, 189, 27, 0)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: "rgb(137,189,27)"
          }
        },
        data: (function () {
          let res = [];
          let len = 50;
          while (len--) {
            res.push(0);
          }
          return res;
        })()
      }
    ]
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
            style={{ height: '30vh' }}
          />

          <pre>
            {/* <code>{code}</code> */}
          </pre>
        </div>
      </div>
    );
  }
}
