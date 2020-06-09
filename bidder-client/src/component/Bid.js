import React, { useState, useEffect } from "react";
import { Auction } from "../api/auction";
import { Bid } from "../api/bid";
const Bid1 = props => {
  const [auction, setAuction] = useState(null);
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
    //event.preventDefault();
    if (auction.bids.length === 0) {
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
    Auction.one(props.params).then(auction => {
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
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="price">Bid Here : </label>
            <input
              name="price"
              id="price"
              type="number"
              onChange={handleChange}
              value={input.price}
            />
            <div>
              <button>Bid</button>
            </div>
          </div>
        </form>
        <h2 className="ui horizontal divider header">Bids</h2>
        <ul className="ui list">
          {auction.bids.map(bid => (
            <div key={bid.id} className="ui raised clearing segment">
              <li>
                <p>
                  {bid.price} | created at:{" "}
                  {bid.created_at.toString().split("T")[0]}{" "}
                </p>
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  }
};
export default Bid1;
