import React, { useState, useEffect } from "react";
import { Auction } from "../api/auction";
import { Bid } from "../api/bid";
import Bid1 from "../component/Bid";
const AuctionShowPage = props => {
  const [auction, setAuction] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");
  const [input, setInput] = useState({
    price: ""
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setInput({
      ...input,
      [evt.target.name]: value,
      auction_id: auction.id
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (auction.bids) {
      let firstbid = Object.values(auction.bids)["0"].price;

      if (input.price < firstbid) {
        event.preventDefault();
        setError("Your Bid Must Be Higher Then The Last Bid");
      } else {
        event.preventDefault();

        Bid.create(input).then(data => {
          if (data.status === 422) {
            setError(data.error);
          } else {
            let date = new Date();
            setAuction(state => {
              return {
                ...state,
                bid: state.bid.push({ price: input, created_at: date })
              };
            });
            console.log(data);
            setError("");
          }
        });
      }
    }
  }

  useEffect(() => {
    Auction.one(props.match.params.id).then(auction => {
      auction.bids.sort(function(a, b) {
        var keyA = new Date(a.price),
          keyB = new Date(b.price);

        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });

      setAuction(auction);

      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <div>
        Loading
        {/* <Spinner message="Question doesn't exist" />; */}
      </div>
    );
  } else {
    return (
      <main className="AuctionShowPage">
        <div className="ui teal clearing segment ">
          <h2>{auction.title}</h2>
          <p>{auction.description}</p>
          <div>Reserved Price: ${auction.reserve_price}</div>
          <div>Ends at: {auction.ends_at}</div>
        </div>
        <br />
        <div>
          <div>
            <strong>{error}</strong>
          </div>
          <br />
          <Bid1 params={props.match.params.id} />

          {/* <div className="ui segment">{auction.bids}</div> */}
        </div>
      </main>
    );
  }
};
export default AuctionShowPage;
