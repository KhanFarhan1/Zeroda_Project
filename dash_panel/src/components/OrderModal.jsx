import { useState } from "react";
import "./OrderModal.css";
import axios from "axios";

const OrderModal = ({
  mode = "BUY",
  stockName = "RELIANCE",
  livePrice = 2450.5,
  onClose,
}) => {
  const [qty, setQty] = useState(1);

  const isBuy = mode === "BUY";
  const totalValue = (qty * livePrice).toFixed(2);

  const handlebuy = () => {
    axios.post("http://localhost:8080/api/newOrder", {
      name: stockName,
      qty: qty,
      price: livePrice,
      mode: mode,
    });
    onClose();
  };

  return (
    <div className="om-overlay" onClick={onClose}>
      <div className="om-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          className={`om-header ${isBuy ? "om-header--buy" : "om-header--sell"}`}
        >
          <div className="om-header-left">
            <span className="om-stock-name">{stockName}</span>
            <span className="om-exchange">NSE</span>
          </div>
          <button className="om-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="om-body">
          <div className="om-row">
            <div>
              <div className="om-label">Market Price</div>
              <div className="om-value">₹ {livePrice}</div>
            </div>
            <div className="om-text-right">
              <div className="om-label">Order Type</div>
              <div
                className={`om-value ${isBuy ? "om-value--buy" : "om-value--sell"}`}
              >
                {mode}
              </div>
            </div>
          </div>

          <div className="om-divider" />

          <div className="om-qty-label">Quantity</div>
          <div className="om-qty-row">
            <button
              className="om-qty-btn"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <input
              type="number"
              className="om-qty-input"
              value={qty}
              min={1}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            />
            <button className="om-qty-btn" onClick={() => setQty((q) => q + 1)}>
              +
            </button>
          </div>

          <div className="om-total-row">
            <span className="om-total-label">Total Value</span>
            <span className="om-total-value">
              ₹ {Number(totalValue).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="om-footer">
          <button className="om-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`om-confirm-btn ${isBuy ? "om-confirm-btn--buy" : "om-confirm-btn--sell"}`}
            onClick={handlebuy}
          >
            {isBuy ? "Buy" : "Sell"} {stockName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
