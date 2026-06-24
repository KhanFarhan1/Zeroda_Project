const { model } = require("mongoose");

const { OrderSchema } = require("../Schema/OrderSchema");

const OrderModel = new model("order", OrderSchema);

module.exports = { OrderModel };
