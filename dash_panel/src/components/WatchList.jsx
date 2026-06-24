import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
// import { watchlist } from "../data/data";
import OrderModal from "./OrderModal";
import { getwatchlistdata } from "../servies/getwatchlistapi";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let data = await getwatchlistdata();
      setWatchlist(data);
    };
    fetchData();
  }, []);
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>
      <ul className="list">
        {watchlist.map((stock, index) => (
          <WatchlistItem stock={stock} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default WatchList;

const WatchlistItem = ({ stock }) => {
  const [showdata, setShowdata] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowdata(true)}
      onMouseLeave={() => {
        if (!showModal) setShowdata(false);
      }}
    >
      <div className="item">
        <p className={stock.IsDown ? "down" : "up"}>{stock.name}</p>
        <div
          className="itemInfo"
          style={{ display: "flex", gap: "6px", alignItems: "center" }}
        >
          <span>{stock.percent}</span>
          <span>
            {stock.IsDown ? (
              <i className="fa-solid fa-angle-down"></i>
            ) : (
              <i className="fa-solid fa-angle-up"></i>
            )}
          </span>
          <span className="price">₹ {stock.price}</span>
        </div>
      </div>
      {showdata && (
        <WatchlistAction
          uuid={stock.name}
          stock={stock}
          onModalOpen={() => setShowModal(true)}
          onModalClose={() => setShowModal(false)}
        />
      )}
    </li>
  );
};

const WatchlistAction = ({ uuid, stock, onModalOpen, onModalClose }) => {
  const [showbuymodal, setShowbuymodal] = useState(false);
  const [showsellmodal, setShowsellmodal] = useState(false);

  const openBuy = () => {
    setShowbuymodal(true);
    onModalOpen();
  };
  const openSell = () => {
    setShowsellmodal(true);
    onModalOpen();
  };
  const closeBuy = () => {
    setShowbuymodal(false);
    onModalClose();
  };
  const closeSell = () => {
    setShowsellmodal(false);
    onModalClose();
  };

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow>
          <button className="buy" onClick={openBuy}>
            Buy
          </button>
        </Tooltip>
      </span>
      <span>
        <Tooltip title="Sell (S)" placement="top" arrow>
          <button className="sell" onClick={openSell}>
            Sell
          </button>
        </Tooltip>
      </span>
      <span>
        <Tooltip title="More" placement="top" arrow>
          <button className="more">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </Tooltip>
      </span>

      {showbuymodal && (
        <OrderModal
          mode="BUY"
          stockName={uuid}
          livePrice={stock.price}
          onClose={closeBuy}
        />
      )}
      {showsellmodal && (
        <OrderModal
          mode="SELL"
          stockName={uuid}
          livePrice={stock.price}
          onClose={closeSell}
        />
      )}
    </span>
  );
};
