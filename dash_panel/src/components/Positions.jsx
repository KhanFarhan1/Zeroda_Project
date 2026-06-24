import React, { useEffect, useState } from "react";
import { getpostionapi } from "../servies/getpostionapi";
const Positions = () => {
  const [postionDB, setPostionDB] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      let data = await getpostionapi();
      setPostionDB(data);
    };
    fetchdata();
  }, []);
  return (
    <>
      <h3 className="title">Positions ({postionDB.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
          {postionDB.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.product}</td>
                <td>{data.name}</td>
                <td>{data.qty}</td>
                <td>{data.avg}</td>
                <td>{data.price}</td>
                <td className={data.isLoss ? "loss" : "profit"}>{data.net}</td>
                <td className={data.isLoss ? "loss" : "profit"}>{data.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
