import React, { useState } from "react";
import { Session } from "../api/session";
import { Auction } from "../api/auction";
const AuctionNewPage = props => {
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    title: "",
    description: "",
    ends_at: "",
    reserve_price: ""
  });
  function handleChange(evt) {
    const value = evt.target.value;
    setInput({
      ...input,
      [evt.target.name]: value
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    Auction.create(input).then(data => {
      if (data.status === 422) {
        setError("Could not create");
      } else {
        props.history.push(`/auctions/${data.id}`);
      }
    });
  }
  return (
    <div>
      <h1>Auctions New Page</h1>
      <form onSubmit={handleSubmit}>
        <p>{error}</p>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            id="title"
            type="text"
            onChange={handleChange}
            value={input.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            name="description"
            id="description"
            type="text"
            onChange={handleChange}
            value={input.description}
          />
        </div>
        <div>
          <label htmlFor="ends_at">Ends At</label>
          <input
            name="ends_at"
            id="ends_at"
            type="date"
            onChange={handleChange}
            value={input.ends_at}
          />
        </div>
        <div>
          <label htmlFor="reserve_price">Reserved Price:</label>
          <input
            name="reserve_price"
            id="reserve_price"
            type="number"
            onChange={handleChange}
            value={input.reserve_price}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};
export default AuctionNewPage;
