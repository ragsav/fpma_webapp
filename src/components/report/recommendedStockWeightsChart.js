import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Col, Container, Row } from "react-bootstrap";

const RecStockWeigthChart = (props) => {
  const [series, setSeries] = useState(null);
  const [options, setOptions] = useState(null);
  useEffect(() => {
    if (props.recommended_stock_weights != null) {
      var symbols = [];
      var ser = [];
      props.recommended_stock_weights.forEach((w) => {
        var wi = w.split(",");
        symbols.push(wi[0]);
        ser.push(parseInt(wi[1]));
      });
      setSeries([...ser]);
      var opt = {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: [...symbols],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      };
      setOptions(opt);
    }
  }, [props.recommended_stock_weights]);

  return series ? (
    <div id="chart">
      <Container style={{ padding: 2, margin: 0, textAlign: "left" }}>
        <Chart options={options} series={series} type="pie" width={"100%"} />
      </Container>
    </div>
  ) : null;
};

export default RecStockWeigthChart;
