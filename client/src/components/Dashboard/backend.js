export default function getDataFromBackend(dashboardType, dashboardID) {
  // Note : If the dashboardType is Predefined then we need to take the Layouts and Toolbox object of the current user
  var dashboards = {
    hash_SOC_Monitoring_DashboardID: {
      layouts: {
        lg: [
          {
            i: "0",
            x: 0,
            y: 0,
            w: 4,
            h: 10,
            minW: 4,
            minH: 10,
            static: false,
          },
          {
            i: "1",
            x: 4,
            y: 0,
            w: 4,
            h: 10,
            minW: 4,
            minH: 10,
            static: false,
          },
          {
            i: "2",
            x: 8,
            y: 0,
            w: 4,
            h: 10,
            minW: 4,
            minH: 10,
            static: false,
          },
          {
            i: "3",
            x: 0,
            y: 10,
            w: 4,
            h: 10,
            minW: 4,
            minH: 10,
            static: false,
          },
          {
            i: "4",
            x: 4,
            y: 10,
            w: 4,
            h: 10,
            minW: 4,
            minH: 10,
            static: false,
          },
        ],
      },
      toolbox: {
        lg: [],
      },
      itemContentMap: {
        0: {
          contentID: "contentID_0",
          caption: "Average Time To Detect",
          pinnedState: true,
          info:
            "The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element. Chart 0",
        },
        1: {
          contentID: "contentID_1",
          caption: "Average Time To Open",
          pinnedState: false,
          info:
            "The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element. Chart 1",
        },
        2: {
          contentID: "contentID_2",
          caption: "Incident Category",
          pinnedState: false,
          info:
            "The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element. Chart 2",
        },
        3: {
          contentID: "contentID_3",
          caption: "Incident Threat Category",
          pinnedState: false,
          info:
            "The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element. Chart 3",
        },
        4: {
          contentID: "contentID_4",
          caption: "Source Of Confirmed Incidents",
          pinnedState: false,
          info:
            "The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element. Chart 4",
        },
      },
    },
  };

  // change the condition : if we get a blank object from firestore
  if (dashboards.hasOwnProperty(dashboardID)) {
    return dashboards[dashboardID];
  } else {
    let emptyDashboardProps = {
      layouts: { lg: [] },
      toolbox: { lg: [] },
      itemContentMap: {},
    };
    return emptyDashboardProps;
  }
}
