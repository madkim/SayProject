import React from "react";
// import { history } from '../_helpers/history';
import { useDispatch } from "react-redux";
// import { alertActions } from '../_actions/alert.actions';
import { Route, Redirect } from "react-router-dom";
// import { authenticationService } from "../_services/authentication.service";

interface Props {
  component: any;
  props: any;
  roles: any;
  rest: any;
}

export default ({
  component: Component,
  props: cProps,
  roles,
  ...rest
}: Props) => {
  const dispatch = useDispatch();

  return (
    <Route
      {...rest}
      render={(props) => {
        const currentUser = true; //authenticationService.currentUserValue;

        // Authentication
        if (!currentUser) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        // Authorization
        // if (roles && roles.indexOf(currentUser.UserType.Name) === -1) {
        // history.push('/');

        // dispatch(alertActions.error("Sorry, you are forbidden from accessing that resource."))
        // }

        return <Component {...props} {...cProps} />;
      }}
    ></Route>
  );
};
