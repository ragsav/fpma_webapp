import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Col, Container, Row, Button, ButtonGroup } from "react-bootstrap";
const alpha = require("alphavantage")({ key: "B02L3PBPXDL1PUY4" });
const LineChart = (props) => {
  const options = {
    chart: {
      type: "area",
      height: 350,
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: props.symbol,
      align: "left",
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      // tooltip: {
      //   enabled: true,
      // },
    },
  };

  const [rawData, setRawData] = useState(null);
  const [series, setSeries] = useState(null);
  const [dataType, setDataType] = useState("1. open");
  useEffect(() => {
    alpha.data.daily(props.symbol).then((data) => {
      var arrayData = [];
      setRawData(data);
      for (const [key, value] of Object.entries(data["Time Series (Daily)"])) {
        var d = {};
        var parts = key.split("-");
        var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
        d.x = mydate;
        // d.y = [
        //   value["1. open"],
        //   value["2. high"],
        //   value["3. low"],
        //   value["4. close"],
        // ];
        d.y = value[dataType];
        arrayData.push(d);
      }

      arrayData.sort(function (a, b) {
        return a.date - b.date;
      });

      setSeries([{ data: [...arrayData] }]);
    });
  }, [props.symbol]);

  useEffect(() => {
    if (rawData != null) {
      var arrayData = [];
      for (const [key, value] of Object.entries(
        rawData["Time Series (Daily)"]
      )) {
        var d = {};
        var parts = key.split("-");
        var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
        d.x = mydate;
        // d.y = [
        //   value["1. open"],
        //   value["2. high"],
        //   value["3. low"],
        //   value["4. close"],
        // ];
        d.y = value[dataType];
        arrayData.push(d);
      }

      arrayData.sort(function (a, b) {
        return a.date - b.date;
      });

      setSeries([{ data: [...arrayData] }]);
    }
  }, [dataType]);

  return (
    <div id="chart">
      {series ? (
        <Container style={{ padding: 0, margin: 0, width: "100%" }}>
          <Row style={{ padding: 0, margin: 0, width: "100%" }}>
            <Col style={{ padding: 0, margin: 0, width: "100%" }}>
              <Chart
                options={options}
                series={series}
                type="area"
                width={"100%"}
                height={400}
              />
            </Col>
          </Row>
          <Row style={{ padding: 0, margin: 0, width: "100%" }}>
            <Col style={{ padding: 0, margin: 0, width: "100%" }}>
              <ButtonGroup
                style={{ padding: 0, width: "70%", marginBottom: 10 }}
              >
                <Button
                  variant={dataType === "1. open" ? "dark" : "secondary"}
                  style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setDataType("1. open");
                  }}
                >
                  open
                </Button>
                <Button
                  variant={dataType === "4. close" ? "dark" : "secondary"}
                  style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setDataType("4. close");
                  }}
                >
                  close
                </Button>
                <Button
                  variant={dataType === "2. high" ? "dark" : "secondary"}
                  style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setDataType("2. high");
                  }}
                >
                  high
                </Button>
                <Button
                  variant={dataType === "3. low" ? "dark" : "secondary"}
                  style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setDataType("3. low");
                  }}
                >
                  low
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
      ) : null}
    </div>
  );
};

export default LineChart;
