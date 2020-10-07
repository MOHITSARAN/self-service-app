export default function getDataFromBackend(userID) {
  let predefinedDomains = [
    {
      key: "hash_SOC_DomainID",
      label: "SOC",
      icon: "bar_chart",
      dashboards: [
        {
          key: "hash_SOC_Monitoring_DashboardID",
          label: "SOC Monitoring",
          icon: "bar_chart",
          path: "reports",
        },
        {
          key: "hash_SOC_Incidents_DashboardID",
          label: "SOC Incidents",
          icon: "bar_chart",
          path: "soc_incidents",
        },
      ],
    },
    {
      key: "hash_Email_Security_DomainID",
      label: "Email Security",
      icon: "dashboard",
      dashboards: [
        {
          key: "hash_Email_Security_DashboardID",
          label: "Email Security",
          icon: "bar_chart",
          path: "email_security",
        },
      ],
    },
  ];

  let myDashboards = [
    {
      key: "hash_MyReports1_DashboardID",
      label: "My Reports 1",
      icon: "bar_chart",
      path: "reports1",
    },
    {
      key: "hash_MyReports2_DashboardID",
      label: "My Reports 2",
      icon: "bar_chart",
      path: "reports2",
    },
  ];

  let sideBarObjects = { predefinedDomains, myDashboards };
  return sideBarObjects;
}
