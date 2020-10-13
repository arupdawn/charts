import React from "react";
import "./App.css";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Customers from "./Customers";

function App() {
  let db = require("./db.json");
  //console.log("db data >>", db);

  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https://revtap.ai/wp-content/uploads/2019/06/Revtap_logo_sample2-200x73.png"
          alt=""
        />
        <h2>Customer & order report</h2>
      </div>
      <div className="app__barChart">
        <BarChart db={db} />
        <LineChart db={db} />
        <Customers db={db} />
      </div>
      <br />
      <br />
    </div>
  );
}

export default App;
