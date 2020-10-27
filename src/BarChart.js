import React, { useState } from "react";
import "./BarChart.css";
import { Bar } from "react-chartjs-2";
import * as _ from "lodash";

function BarChart({db}) {

  let newData = db.customers.map((customer) => {
    let day = customer.created.slice(0, 10);
    return {
      ...customer,
      created: day
    };
  });

  //console.log("NewData >> ", newData[0]);
  
  let groups;
  groups = _.groupBy(newData, "created");
  //console.log("groups >> ", groups);
  let result = _.map(groups, function (value, key) {
    return {
      date: key,
      orders: _.reduce(
        value,
        function (total, o) {
          return total + o.orders;
        },
        0
      ),
    };
  });
  //console.log("newresult data >>", result);

  let newDate = result.sort((a,b)=>{
    return new Date(a.date) - new Date(b.date)
  });
  console.log("newDate data >>", newDate);
  
  let newLabels=[],newOrders=[];
  newDate.forEach(element => {
    newLabels.push(element.date.slice(8,10));
    newOrders.push(element.orders);
  });

  /*console.log("newLabels data >>", newLabels);
  console.log("newOrders data >>", newOrders);*/

  // set data
  const [barData, setBarData] = useState({
    labels: newLabels,
    datasets: [
      {
        label: "orders",
        data: newOrders,
        backgroundColor: "#3366CC",
        borderColor: "#3366CC",
        borderWidth: 2,
        barPercentage: 0.6,
      },
    ],
  });
  // set options
  const [barOptions, setBarOptions] = useState({
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              display: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Orders Count ",
              fontSize: 15,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Date ",
              fontSize: 15,
            },
          },
        ],
      },
      title: {
        display: true,
        text: "Orders Count",
        fontSize: 18,
      },
      legend: {
        display: false, //or true
        position: "top",
      },
    },
  });

  return (
    <div className="barChart">
      <h2>Orders Count</h2>
      <Bar data={barData} options={barOptions.options} />
    </div>
  );
}

export default BarChart;
