import React from "react";
import { Route, Redirect } from "react-router-dom";
import isAdmin from "./Admin";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        !isAdmin() &&
          alert("접근 권한이 없습니다. 로그인 후 다시 시도하십시오.");
        return isAdmin() ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;