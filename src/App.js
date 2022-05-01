import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LandingPageLayout, UserDashboardLayout } from "./Layout";
import {
  AuthLogin,
  AuthRegister,
  AuthRequestPasswordReset,
  AuthResetPassword,
  AuthUpdateCredentials,
  AuthUpdateUserPhoto,
  TeamInviteConfirmation,
  TeamSelected,
} from "./Pages";
import { MyRoute } from "./Helpers";
import Page404 from "./Pages/404";
function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route element={<LandingPageLayout />}>
          <Route index navigationType="REPLACE" path={MyRoute.home.route} element={<AuthLogin />} />

          <Route
           navigationType="REPLACE"
            path={MyRoute.home.subRoutes.signup.route}
            element={<AuthRegister />}
          />
          <Route
            navigationType="REPLACE"
            path={MyRoute.home.subRoutes.requestPassReset.route}
            element={<AuthRequestPasswordReset />}
          />
          <Route
            navigationType="REPLACE"
            path={MyRoute.home.subRoutes.resetPassword.route}
            element={<AuthResetPassword />}
          />
           <Route
             navigationType="REPLACE"
            path={MyRoute.home.subRoutes.acceptInvite.route}
            element={<TeamInviteConfirmation />}
          />
          
        </Route>

        {/*User Dashboard */}
        <Route element={<UserDashboardLayout />}>
          <Route
            index
            navigationType="REPLACE"
            path={MyRoute.dashboard.subRoutes.teams.home}
            element={<TeamSelected />}
          />
          <Route
            navigationType="REPLACE"
            path={MyRoute.dashboard.subRoutes.teams.route}
            element={<TeamSelected />}
          />
           <Route
             navigationType="REPLACE"
            path={MyRoute.dashboard.subRoutes.editProfile.route}
            element={<AuthUpdateCredentials />}
          />
           <Route
             navigationType="REPLACE"
            path={MyRoute.dashboard.subRoutes.editProfile.changePhotoRoute}
            element={<AuthUpdateUserPhoto />}
          />
        </Route>
        <Route path="*" element={<Page404/>}   />
      </Routes>
    </Router>
  );
}

export default App;
