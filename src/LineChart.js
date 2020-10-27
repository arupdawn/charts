import React, { useState } from "react";
import "./LineChart.css";
import { Line } from "react-chartjs-2";
import * as _ from "lodash";

function LineChart({db}) {

  let newData = db.orders.map((order) => {
    let day = order.created.slice(0, 10);
    return {
      ...order,
      created: day,
      price: Number(order.price)
    };
  });

  //console.log("NewData orders >> ", newData);

  let groups;
  groups = _.groupBy(newData, "created");
  let result = _.map(groups, function (value, key) {
    return {
      date: key,
      totalprice: _.reduce(
        value,
        function (total, o) {
          return total + o.price;
        },
        0
      ),
    };
  });
  //console.log("newresult data >>", result);

  let newPrice = result.sort((a,b)=>{
    return new Date(a.date) - new Date(b.date)
  });

  let newLabels=[],newPrices=[];
  newPrice.forEach(element => {
    newLabels.push(element.date.slice(8,10));
    newPrices.push(element.totalprice);
  });
  //console.log("newPrice data >>", newPrice);

    // set data
  const [lineData, setLineData] = useState({
    labels: newLabels,
    datasets: [
      {
        label: "price",
        data: newPrices,
        backgroundColor: "transparent",
        borderColor: "#3366CC",
        borderWidth: 3,
      },
    ],
  });
  // set options
  const [lineOptions, setLineOptions] = useState({
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
              labelString: "Total price  ",
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
        text: "Orders total price",
        fontSize: 17,
      },
      legend: {
        display: false,
        position: "top",
      },
    },
  });

    return (
        <div className="lineChart">
            <h2>Orders Total Price</h2>
            <Line data={lineData} options={lineOptions.options}/>
        </div>
    )
}

export default LineChart;
