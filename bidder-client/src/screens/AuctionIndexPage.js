import React, { useState, useEffect } from "react";
import { Auction } from "../api/auction";
import { Link } from "react-router-dom";
const AuctionIndexPage = props => {
  const [auctions, setAuctions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    Auction.all().then(auctions => {
      setAuctions(auctions);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <div>Loading</div>;
  } else {
    return (
      <main className="AuctionIndexPage Page">
        <h2 className="ui horizontal divider header">Auctions</h2>
        <ul className="ui list">
          {auctions.map(auction => (
            <div key={auction.id} className="ui raised clearing segment">
              <h3 className="ui header">
                <Link to={`/auctions/${auction.id}`}>{auction.title}</Link>
              </h3>
            </div>
          ))}
        </ul>
      </main>
    );
  }
};
export default AuctionIndexPage;
