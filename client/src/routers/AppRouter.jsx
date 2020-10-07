import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";

// Pages
import Auth from "../components/AuthHOC";
import SignInPage from "../containers/Pages/SignIn/SignInPage";
import NotFoundPage from "../containers/Pages/NotFoundPage";
import DashboardPage from "../containers/App/App";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history} basename={process.env.PUBLIC_URL}>
    <div>
      <Switch>
        <Route path='/' component={SignInPage} exact />
        <Route
          path='/dashboard'
          render={() => (
            <Auth>
              <DashboardPage />
            </Auth>
          )}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
