import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { User } from "./api/session";
import { Session } from "./api/session";
import NavBar from "./component/NavBar";
import WelcomePage from "./screens/WelcomePage";
import AuctionIndexPage from "./screens/AuctionIndexPage";
import AuctionNewPage from "./screens/AuctionNewPage";
import AuctionShowPage from "./screens/AuctionShowPage";
import SignIn from "./screens/SignIn";
import AuthRoute from "./component/AuthRoute";
import { sign } from "crypto";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  const destroySession = () => {
    Session.destroy().then(() => {
      setCurrentUser(null);
      setSignedIn(false);
    });
  };

  function sing() {
    setSignedIn(false);
    User.current().then(data => {
      setCurrentUser(data);
      setSignedIn(true);
    });
  }

  return (
    <BrowserRouter>
      <header>
        <NavBar currentUser={currentUser} signOut={destroySession} />
      </header>
      <div className="ui container App">
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/auctions" component={AuctionIndexPage} />
          <AuthRoute
            isAllowed={currentUser}
            exact
            path="/auctions/new"
            component={AuctionNewPage}
          />
          <Route path="/auctions/:id" component={AuctionShowPage} />
          <Route
            path="/sign_in"
            render={routerProps => (
              <SignIn {...routerProps} getUser={sing}></SignIn>
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
