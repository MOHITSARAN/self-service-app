import React, { Component } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import Loader from "../Loader";
import Error from "../Error";

import { callAPI } from "../../helpers/utility";
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme, CandyTheme);

// Single Series Charts include these charts :
// column2d
// column3d
// line
// area2d
// bar2d
// bar3d
// pie2d
// pie3d
// doughnut2d
// doughnut3d
// pareto2d
// pareto3d

class SingleSeriesChart extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: false,
      chartConfigs: {},
    };
  }

  // Invoked just after 1st time render method is called
  componentDidMount() {
    let { darkState, contentID } = this.props;

    callAPI(
      "getDataFromBQ",
      "post",
      this.handleBuildChart.bind(this, darkState),
      this.handleError.bind(this, darkState),
      { contentID }
    );
  }

  handleBuildChart(darkState, data) {
    let {
      type,
      caption,
      subCaption,
      xAxisName,
      yAxisName,
      numberSuffix,
      chartData,
    } = data.data;

    let chartConfigs = {};

    chartConfigs.type = type;

    chartConfigs.width = "100%";
    chartConfigs.height = "100%";
    chartConfigs.dataFormat = "json";
    chartConfigs.dataSource = { chart: {}, data: [] };
    chartConfigs.dataSource.chart.caption = caption;
    chartConfigs.dataSource.chart.subCaption = subCaption;
    chartConfigs.dataSource.chart.xAxisName = xAxisName;
    chartConfigs.dataSource.chart.yAxisName = yAxisName;
    chartConfigs.dataSource.chart.numberSuffix = numberSuffix;
    chartConfigs.dataSource.chart.theme = darkState ? "candy" : "fusion";

    if (darkState === true) {
      chartConfigs.dataSource.chart.bgColor = "#424242";
    } else {
      chartConfigs.dataSource.chart.bgColor = "#ffffff";
    }

    chartConfigs.dataSource.data = chartData;

    this.setState({ loading: false, chartConfigs, error: false, darkState });
  }

  handleError(darkState, err) {
    this.setState({ loding: false, error: true, darkState });
  }

  // Invoked each time darkState is toggled
  componentDidUpdate(prevProps, prevState) {
    if (this.props.darkState !== prevProps.darkState) {
      let newConfigs = prevState.chartConfigs;
      newConfigs.dataSource.chart.theme = this.props.darkState
        ? "candy"
        : "fusion";
      if (this.props.darkState === true) {
        newConfigs.dataSource.chart.bgColor = "#424242";
      } else {
        newConfigs.dataSource.chart.bgColor = "#ffffff";
      }
      this.setState({ chartConfigs: newConfigs });
    }
  }

  render() {
    let { loading, error } = this.state;

    if (loading) return <Loader />;

    if (!loading && error) return <Error />;

    if (!loading && !error) return <ReactFC {...this.state.chartConfigs} />;
  }
}

export default SingleSeriesChart;
