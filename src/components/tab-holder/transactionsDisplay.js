import { useEffect, useState } from "react";
import { Col, Container, Card, Row } from "react-bootstrap";

const TransactionTile = (props) => {
  const t = props.transaction;
  var d = new Date(1970, 0, 1); // Epoch
  d.setSeconds(t["date"].seconds);

  // console.log(t);

  return (
    <Card
      style={{
        // backgroundColor: "white",
        border: "1px solid green",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <Container>
        <Row
          style={{
            padding: "0px 8px 0px 8px",
            margin: 0,
          }}
        >
          <Col
            style={{
              fontWeight: "700",
              textAlign: "left",
              fontSize: 12,
              padding: 4,
              margin: 0,
            }}
          >
            {t["symbol"]}
          </Col>
          <Col
            style={{
              fontWeight: "700",
              textAlign: "right",
              fontSize: 12,
              padding: 4,
              margin: 0,
            }}
          >
            {`${t["shares"]} shares`}
          </Col>
        </Row>
        <Row
          style={{
            padding: "0px 8px 0px 8px",
            margin: 0,
          }}
        >
          <Col
            style={{ textAlign: "left", fontSize: 12, padding: 4, margin: 0 }}
          >
            {d.toDateString()}
          </Col>
          <Col
            style={{ textAlign: "right", fontSize: 12, padding: 4, margin: 0 }}
          >
            {`${t["pricePerShare"]} Rupees/share`}
          </Col>
        </Row>
      </Container>
    </Card>
  );
};
const TransactionsDisplay = (props) => {
  useEffect(() => {
    //
  }, [props.transactions]);

  // console.log(props.transactions);
  return props.transactions ? (
    <Container
      style={{
        backgroundColor: "white",
        margin: 0,
        padding: 0,
      }}
    >
      {props.transactions.map((t, i) => {
        // console.log(t);
        // console.log(i);
        return (
          <Row
            key={i}
            style={{
              margin: 4,
              padding: 0,
            }}
          >
            <TransactionTile transaction={t}></TransactionTile>
          </Row>
        );
      })}
    </Container>
  ) : null;
};
export default TransactionsDisplay;
