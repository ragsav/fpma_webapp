import { useEffect ,useState} from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { extractCompanyWiseReturn } from "./algorithms";
import CompanyWiseStatus from "./companyWiseStatus";
import RecStocksTree from "./recommendedStocksTree";
import RecStockWeigthChart from "./recommendedStockWeightsChart";

const Report = (props) => {

  const [company_returns, setCompanyReturns] = useState(
    extractCompanyWiseReturn(props.transactions)
  );
  useEffect(()=>{
    setCompanyReturns(extractCompanyWiseReturn(props.transactions));
  },[props.transactions])
  return company_returns ? (
    <Container
      style={{ padding: 0, margin: 0, paddingTop: 30, paddingBottom: 30 }}
    >
      <Row style={{ padding: 2, margin: 0 }}>
        <Col style={{ padding: 0, margin: 0 }}>
          <CompanyWiseStatus
            type={"Returns"}
            xaxis={company_returns.symbols}
            yaxis={company_returns.returns}
            title={"Returns"}
          ></CompanyWiseStatus>
        </Col>
        <Col style={{ padding: 0, margin: 0 }}>
          <CompanyWiseStatus
            type={"Investments"}
            xaxis={company_returns.symbols}
            yaxis={company_returns.investments}
            title={"Investments"}
          ></CompanyWiseStatus>
        </Col>
        <Col style={{ padding: 0, margin: 0 }}>
          <CompanyWiseStatus
            type={"Balance stocks"}
            xaxis={company_returns.symbols}
            yaxis={company_returns.balance_stocks}
            title={"Balance stocks"}
          ></CompanyWiseStatus>
        </Col>
      </Row>
      <Row
        style={{
          margin: 0,
          padding: 0,
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <Card
          style={{
            margin: 0,
            height: 1,
            width: "100%",
          }}
        ></Card>
      </Row>
      <Row style={{ padding: 2, margin: 0 }}>
        <Col style={{ padding: 0, margin: 0 }}>
          <RecStockWeigthChart
            recommended_stock_weights={props.recommended_stock_weights}
          ></RecStockWeigthChart>
        </Col>
        <Col style={{ padding: 0, margin: 0 }}>
          <RecStocksTree recommended_stocks={props.recommended_stocks}></RecStocksTree>
        </Col>
        
      </Row>
    </Container>
  ) : null;
};

export default Report;
