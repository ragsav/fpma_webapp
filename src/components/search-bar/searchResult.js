import { Row, Col, Card } from "react-bootstrap";
const SearchResult = (props) => {
  return (
    <div onClick={props.onClick}>
      <Card style={{ margin: 2 }}>
        <Row style={{ margin: 0, padding: 4, fontSize: 10 }}>
          <Col
            style={{ margin: 0, padding: 4, textAlign: "left", color: "black" }}
          >
            {props.symbol}
          </Col>
          <Col
            style={{
              margin: 0,
              padding: 4,
              textAlign: "right",
              color: "black",
            }}
          >
            {props.name}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SearchResult;
