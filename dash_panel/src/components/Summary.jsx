import React, { useEffect, useState } from "react";
import { getholding } from "../servies/getholdingapi";
const Summary = () => {
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
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({allholdingDB.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={profitloss >= 0 ? "profit" : "loss"}>
              {profitloss.toFixed(2)}{" "}
              <small>({percentprofitloss.toFixed(2)}%)</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{Currentvalue.toFixed(2)}</span>{" "}
            </p>
            <p>
              Investment <span>{totalInvestment.toFixed(2)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
