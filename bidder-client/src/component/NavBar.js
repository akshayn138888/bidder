import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = props => {
  const { currentUser, signOut } = props;
  return (
    <div className="ui secondary pointing menu">
      <div>
        <NavLink exact to="/" className="item">
          | Home |
        </NavLink>
        <NavLink exact to="/auctions" className="item">
          | Auctions |
        </NavLink>
        {!currentUser ? (
          ""
        ) : (
          <NavLink className="ui small blue button" to="/auctions/new">
            Auctions New Page
          </NavLink>
        )}

        {currentUser ? (
          ""
        ) : (
          <NavLink className="ui small blue button" to="/sign_in">
            Sign In
          </NavLink>
        )}
      </div>

      <div>
        {currentUser ? (
          <>
            <NavLink className="ui small red button" to="/" onClick={signOut}>
              Sign Out
            </NavLink>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NavBar;
