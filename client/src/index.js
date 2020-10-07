import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import serviceWorker from "./registerServiceWorker";

ReactDOM.render(<AppRouter />, document.getElementById("root"));
serviceWorker();
