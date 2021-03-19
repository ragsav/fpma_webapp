import React, { useEffect, useState } from "react";
import { RecommendationTile } from "../tab-holder/recommendationDisplay";
import {
  Row,
  ListGroup,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

export const RecommendedStockTile = (props) => {
  //   var r = props.recommendation.split(",");
  //   var sym = r[0];
  //   var w = Math.round(parseFloat(r[1]) * 100);
  //   var ret = parseFloat(r[2] ? r[2] : 0) * 252;
  //   var risk = parseFloat(r[3] ? r[3] : 0) * Math.sqrt(252);

  return (
    <Card
      style={{
        backgroundColor: "#c9ffd8",
        border: `2px solid green`,
        // backgroundColor: "#ffd6d6",
        // border: `2px solid red`,

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
            {props.a}
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
            {props.b}
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

const RecStocksTree = (props) => {
  const [mode, setMode] = useState("risk");

  return props.recommended_stocks ? (
    <Card style={{ padding: 2, margin: 10, height: "100%", borderWidth: 2 }}>
      <Container style={{ padding: 0, margin: 0, height: "100%" }}>
        <Row style={{ padding: 0, margin: 0 }}>
          <Col
            style={{
              padding: 4,
              margin: 0,
              paddingLeft: 8,
              fontWeight: "700",
              textAlign: "left",
            }}
          >
            Stocks recommendation
          </Col>
          <Col style={{ padding: 4, margin: 0 }}>
            <DropdownButton
              style={{ float: "right", margin: 0 }}
              variant="outline-secondary"
              title="Select attribute"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item
                href="#"
                onClick={() => {
                  setMode("risk");
                }}
              >
                Risk based
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => {
                  setMode("pChange");
                }}
              >
                Percent change based
              </Dropdown.Item>

              <Dropdown.Item
                href="#"
                onClick={() => {
                  setMode("returns");
                }}
              >
                Return based
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Row style={{ padding: 0, margin: 0, textAlign: "left" }}>
          <Col style={{ padding: 0, margin: 0 }}>
            {props.recommended_stocks[mode].map((r, i) => {
              return (
                <Row
                  key={i}
                  style={{
                    margin: 4,
                    padding: 0,
                  }}
                >
                  <RecommendedStockTile
                    a={r["symbol"]}
                    b={r[mode]}
                  ></RecommendedStockTile>
                </Row>
              );
            })}
          </Col>
        </Row>
      </Container>
    </Card>
  ) : null;
};

export default RecStocksTree;
