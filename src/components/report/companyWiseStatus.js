import Chart from "react-apexcharts";
const CompanyWiseStatus = (props) => {
  var options = {
    chart: {
      id: `apexchart-${props.type}`,
    },
    plotOptions: {
      bar: {
        barHeight: "70%",
        horizontal: true,
        distributed: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    title: {
      text: props.title,
      align: "center",
      floating: true,
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    xaxis: {
      categories: props.xaxis,
    },
  };
  var series = [
    {
      name: props.type,
      data: props.yaxis,
    },
  ];
  return <Chart options={options} series={series} type="bar" width={"100%"} />;
};

export default CompanyWiseStatus;
