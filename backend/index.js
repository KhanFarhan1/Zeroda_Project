require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const cors = require("cors");
const YahooFinance = require("yahoo-finance2").default;
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PostionsModel } = require("./model/PostionsModel");
const { OrderModel } = require("./model/OrderModel");
const authRoutes = require("./route/auth");

const PORT = process.env.PORT || 8080;
const app = express();
const url = process.env.MONGO_URL;
const yahooFinance = new YahooFinance();

//app.use(body_parser.json());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/api/auth", authRoutes);

async function main() {
  await mongoose.connect(url);
}
main()
  .then(() => {
    console.log("DBconnected Successfully");
    app.listen(PORT, () => {
      console.log(`App is listening on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/holdings", async (req, res) => {
  let allholding = await HoldingsModel.find({});
  res.json(allholding);
});

app.get("/postion", async (req, res) => {
  let allpostion = await PostionsModel.find({});
  res.json(allpostion);
});

app.post("/api/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    console.log("Request body:", req.body);
    let newOrder = new OrderModel({ name, qty, price, mode });
    await newOrder.save();

    // Step 2 — Update Holdings based on mode
    if (mode === "BUY") {
      const existing = await HoldingsModel.findOne({ name });

      if (existing) {
        const newQty = existing.qty + qty;
        const newAvgPrice =
          (existing.price * existing.qty + price * qty) / newQty;
        await HoldingsModel.findOneAndUpdate(
          { name },
          { qty: newQty, price: newAvgPrice },
        );
      } else {
        let newHolding = new HoldingsModel({ name, qty, price, mode });
        await newHolding.save();
      }
    } else if (mode === "SELL") {
      const existing = await HoldingsModel.findOne({ name });
      if (!existing) {
        return res.status(400).send("Stock not in holdings");
      }
      if (qty > existing.qty) {
        return res.status(400).send("Not enough quantity to sell");
      }
      if (qty === existing.qty) {
        await HoldingsModel.findOneAndDelete({ name });
      } else {
        await HoldingsModel.findOneAndUpdate(
          { name },
          { qty: existing.qty - qty },
        );
      }
    }
    res.send({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).send("Something went wrong");
  }
});

app.get("/order", async (req, res) => {
  let allorder = await OrderModel.find({});
  res.json(allorder);
});

app.get("/watchlistdata", async (req, res) => {
  try {
    const symbols = [
      "RELIANCE.NS",
      "TCS.NS",
      "INFY.NS",
      "HDFCBANK.NS",
      "SBIN.NS",
      "ICICIBANK.NS",
      "BHARTIARTL.NS",
      "ITC.NS",
      "WIPRO.NS",
      "BAJFINANCE.NS",
    ];

    const data = await Promise.all(
      symbols.map((symbol) => yahooFinance.quote(symbol)),
    );

    const watchlist = data.map((stock) => ({
      name: stock.shortName,
      symbol: stock.symbol,
      price: stock.regularMarketPrice,
      change: stock.regularMarketChange,
      net: `${stock.regularMarketChangePercent.toFixed(2)}%`,
      day: stock.regularMarketChange,
    }));

    res.json(watchlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stocks" });
  }
});
