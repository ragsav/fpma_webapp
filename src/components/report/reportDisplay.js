import { Col, Container, Row } from "react-bootstrap";
import { extractCompanyWiseReturn } from "./algorithms";
import CompanyWiseStatus from "./companyWiseStatus";

const Report = (props) => {
  var company_returns = extractCompanyWiseReturn(props.transactions);
  return company_returns ? (
    <Container style={{ padding: 0, margin: 0 }}>
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
    </Container>
  ) : null;
};

export default Report;
