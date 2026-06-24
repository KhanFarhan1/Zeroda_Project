import React, { useState, useEffect } from "react";
import { getholding } from "../servies/getholdingapi";
const Holdings = () => {
  const [allholdingDB, setAllholdingDB] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      let data = await getholding();
      setAllholdingDB(data);
    };
    fetchdata();
  }, []);

  let totalInvestment = 0;
  let Currentvalue = 0;

  for (let i = 0; i < allholdingDB.length; i++) {
    totalInvestment += allholdingDB[i].qty * allholdingDB[i].avg;
    Currentvalue += allholdingDB[i].qty * allholdingDB[i].price;
  }

  let profitloss = Currentvalue - totalInvestment;
  let percentprofitloss =
    totalInvestment !== 0 ? (profitloss / totalInvestment) * 100 : 0;
  return (
    <>
      <h3 className="title">Holdings ({allholdingDB.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allholdingDB.map((stock, index) => (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg}</td>
                <td>{stock.price}</td>
                <td>{(stock.qty * stock.price).toFixed(2)}</td>

                <td className={stock.net?.includes("+") ? "profit" : "loss"}>
                  {((stock.price - stock.avg) * stock.qty).toFixed(2)}
                </td>

                <td className={stock.net?.includes("+") ? "profit" : "loss"}>
                  {stock.net}
                </td>

                <td className={stock.day?.includes("+") ? "profit" : "loss"}>
                  {stock.day}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>{Currentvalue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className={profitloss >= 0 ? "profit" : "loss"}>
            {profitloss.toFixed(2)} ({percentprofitloss.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
