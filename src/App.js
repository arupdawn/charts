import React from "react";
import "./App.css";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Customers from "./Customers";

function App() {
  let db = require("./db.json");
  //console.log("db data >>", db); {process.env.NODE_ENV}

  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https://revtap.ai/wp-content/uploads/2019/06/Revtap_logo_sample2-200x73.png"
          alt=""
        />
        
      </div>
      <div className="app__barChart">
        <div id="@orderCount">
        <BarChart db={db} startDate="2020-03-01" endDate="2020-05-30"/>
        </div>
        <div id="@orderTotalPrice">
        <LineChart db={db} />
        </div>
        <div id="@customers">
        <Customers db={db} />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default App;
