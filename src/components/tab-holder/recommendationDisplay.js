import { useEffect, useState } from "react";
import { Col, Container, Card, Row } from "react-bootstrap";

const RecommendationTile = (props) => {
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
            Google (AAM)
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
            5 shares
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
            Fir 23 2021 14:32:40(BTC)
          </Col>
          <Col
            style={{ textAlign: "right", fontSize: 12, padding: 4, margin: 0 }}
          >
            345.45 $/share
          </Col>
        </Row>
      </Container>
    </Card>
  );
};
const RecommendationDisplay = (props) => {
  useEffect(() => {
    //
  }, [props.recommendation_list]);

  return props.recommendation_list ? (
    <Container
      style={{
        backgroundColor: "white",
        margin: 0,
        padding: 0,
      }}
    >
      {props.recommendation_list.map((r, i) => {
        return (
          <Row
            key={i}
            style={{
              margin: 4,
              padding: 0,
            }}
          >
            <RecommendationTile recommendation={r}></RecommendationTile>
          </Row>
        );
      })}
    </Container>
  ) : null;
};
export default RecommendationDisplay;
