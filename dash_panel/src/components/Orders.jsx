import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrderapi } from "../servies/getorderapi";

const Orders = () => {
  const [allorder, setAllorder] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      let data = await getOrderapi();
      setAllorder(data);
    };
    fetchdata();
  }, []);
  return (
    <>
      {allorder.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/"} className="btn btn-primary">
            Get started
          </Link>
        </div>
      ) : (
        <div className="orders">
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Order Name</th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Total Price</th>
                  <th>Mode</th>
                </tr>
              </thead>

              <tbody>
                {allorder.map((stock, index) => (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.price}</td>
                    <td>{(stock.price * stock.qty).toFixed(2)}</td>
                    <td>{stock.mode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
