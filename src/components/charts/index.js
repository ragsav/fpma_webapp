import React, { useEffect, useState } from "react";
import Chart from "./charts";
const alpha = require("alphavantage")({ key: "B02L3PBPXDL1PUY4" });

const ChartComponent = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    alpha.data.daily(props.symbol).then((data) => {
      var arrayData = [];
      for (const [key, value] of Object.entries(data["Time Series (Daily)"])) {
        var d = {};
        var parts = key.split("-");
        var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
        d.date = mydate;
        d.open = value["1. open"];
        d.high = value["2. high"];
        d.low = value["3. low"];
        d.close = value["4. close"];
        d.volume = value["5. volume"];
        arrayData.push(d);
      }

      arrayData.sort(function (a, b) {
        return a.date - b.date;
      });
      setData(arrayData);
    });
  }, [props.symbol]);

  if (!data) {
    return <div>Loading...</div>;
  }
  return <Chart type={"hybrid"} data={data} />;
};

export default ChartComponent;
