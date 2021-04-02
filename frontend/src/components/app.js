import React from "react";
import {
  AuthRoute,
  ProtectedRoute,
  TwoFAProtectedRoute,
} from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import TwoFASetupContainer from "./setting/two_fa_setup_container";

import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import RoomsContainer from "./rooms/rooms_container";
import FriendshipContainer from "./friendship/friendship_container";
import WebApp from "./web_app";
import profile_container from "./profile/profile_container";

const App = () => (
  <div className="app">
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute
        exact
        path="/twoFASetup"
        component={TwoFASetupContainer}
      />
      <TwoFAProtectedRoute
        exact
        path="/friends"
        component={FriendshipContainer}
      />
      <TwoFAProtectedRoute exact path="/rooms" component={RoomsContainer} />
      <TwoFAProtectedRoute exact path="/web" component={WebApp} />
      <TwoFAProtectedRoute exact path="/profile" component={profile_container} />
    </Switch>
  </div>
);

export default App;
