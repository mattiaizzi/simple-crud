import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import { routesConfig } from "./app.routes";

const AppRouting = () => {
  const { paths, defaultPath } = routesConfig;
  return (
    <Switch>
      {paths.map((route) => (
        <Route
          key={route.key}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
      <Route path="*">
        <Redirect to={defaultPath} />
      </Route>
    </Switch>
  );
};

export default AppRouting;
