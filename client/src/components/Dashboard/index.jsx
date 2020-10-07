import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Paper } from "@material-ui/core";
import SingleSeriesChart from "../SingleSeriesChart";
import ActionCenter from "../ActionCenter/ActionCenter";
import getDataFromBackend from "./backend";
import InfoButton from "../InfoButton/index";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class Dashboard extends React.Component {
  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function () {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  };

  constructor() {
    super();
    this.state = {
      currentBreakpoint: "lg",
      compactType: "vertical",
      mounted: false,
      layouts: { lg: [] },
      toolbox: { lg: [] },
      itemContentMap: {},
    };
  }

  componentDidMount() {
    let { dashboardType, dashboardID } = this.props;

    let { layouts, toolbox, itemContentMap } = getDataFromBackend(
      dashboardType,
      dashboardID
    );

    layouts.lg.map(item => (itemContentMap[item.i].visible = true));
    toolbox.lg.map(item => (itemContentMap[item.i].visible = false));

    this.setState({
      mounted: true,
      layouts,
      toolbox,
      itemContentMap,
    });
  }

  generateDOM(darkState) {
    if (this.state.layouts.length !== 0) {
      return _.map(this.state.layouts[this.state.currentBreakpoint], item => {
        return (
          <Paper key={item.i}>
            <SingleSeriesChart
              darkState={darkState}
              contentID={this.state.itemContentMap[item.i].contentID}
            />
            <InfoButton InfoText={this.state.itemContentMap[item.i].info} />
          </Paper>
        );
      });
    } else {
      return <Paper>Loading...</Paper>;
    }
  }

  onBreakpointChange = breakpoint => {
    this.setState(prevState => ({
      currentBreakpoint: breakpoint,
      toolbox: {
        ...prevState.toolbox,
        [breakpoint]:
          prevState.toolbox[breakpoint] ||
          prevState.toolbox[prevState.currentBreakpoint] ||
          [],
      },
    }));
  };

  onTakeItem = i => {
    let item = this.state.toolbox[this.state.currentBreakpoint].filter(
      l => l.i === i.toString()
    )[0];

    let itemContentMap = this.state.itemContentMap;
    itemContentMap[i].visible = !itemContentMap[i].visible;

    this.setState(prevState => ({
      toolbox: {
        ...prevState.toolbox,
        [prevState.currentBreakpoint]: prevState.toolbox[
          prevState.currentBreakpoint
        ].filter(({ i }) => i !== item.i),
      },
      layouts: {
        ...prevState.layouts,
        [prevState.currentBreakpoint]: [
          ...prevState.layouts[prevState.currentBreakpoint],
          item,
        ],
      },
      itemContentMap,
    }));
  };

  onPutItem = i => {
    let item = this.state.layouts[this.state.currentBreakpoint].filter(
      l => l.i === i.toString()
    )[0];

    let itemContentMap = this.state.itemContentMap;
    itemContentMap[i].visible = !itemContentMap[i].visible;

    this.setState(prevState => {
      return {
        toolbox: {
          ...prevState.toolbox,
          [prevState.currentBreakpoint]: [
            ...(prevState.toolbox[prevState.currentBreakpoint] || []),
            item,
          ],
        },
        layouts: {
          ...prevState.layouts,
          [prevState.currentBreakpoint]: prevState.layouts[
            prevState.currentBreakpoint
          ].filter(({ i }) => i !== item.i),
        },
        itemContentMap,
      };
    });
  };

  onPinItem = i => {
    let itemContentMap = this.state.itemContentMap;
    itemContentMap[i].pinnedState = true;
    console.log(
      `Item pinned to HomePage. Content ID : ${itemContentMap[i].contentID}`
    );
    this.setState({ itemContentMap });
  };

  onUnPinItem = i => {
    let itemContentMap = this.state.itemContentMap;
    itemContentMap[i].pinnedState = false;
    console.log(
      `Item unpinned from HomePage. Content ID : ${itemContentMap[i].contentID}`
    );
    this.setState({ itemContentMap });
  };

  onEditContent = contentID => {
    console.log(`Edit Content. Content ID : ${contentID}`);
  };

  onDeleteItem = i => {
    console.log(`Delete Item. Content ID : ${i}`);
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
    this.setState({ layouts });
  };

  render() {
    let { darkState } = this.props;

    // Show this when there is no content in the dashboard i.e. itemContentMap is an empty object
    if (
      Object.keys(this.state.itemContentMap).length === 0 &&
      this.state.itemContentMap.constructor === Object
    ) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          No Content to show. Please add.
        </div>
      );
    }

    // Show this when itemContentMap is not empty
    return (
      <div>
        <ActionCenter
          route='/dashboard/draggable'
          onTakeItem={this.onTakeItem}
          onPutItem={this.onPutItem}
          onPinItem={this.onPinItem}
          onUnPinItem={this.onUnPinItem}
          onEditContent={this.onEditContent}
          onDeleteItem={this.onDeleteItem}
          itemContentMap={this.state.itemContentMap}
          type={this.props.dashboardType}
        />

        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
          containerPadding={[20, 20]}
        >
          {this.generateDOM(darkState)}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
