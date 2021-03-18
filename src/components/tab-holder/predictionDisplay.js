import { useEffect, useState } from "react";
import { Col, Container, Card, Row } from "react-bootstrap";
import { db } from "../../firebase/firebase";
const PredictionTile = (props) => {
  const p = props.prediction;
  var start = new Date(1970, 0, 1);
  var end = new Date(1970, 0, 1); // Epoch
  start.setSeconds(p["start_date"].seconds);
  end.setSeconds(p["end_date"].seconds);
  return (
    <Card
      style={{
        backgroundColor: p.prediction === "SELL" ? "#c9ffd8" : "#fffea8",
        border:
          p.prediction === "SELL" ? `2px solid green` : `2px solid orange`,
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
            {p.stock_name}
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
            {start.toDateString()}
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
            {p.prediction}
          </Col>
          <Col
            style={{ textAlign: "right", fontSize: 12, padding: 4, margin: 0 }}
          >
            {end.toDateString()}
          </Col>
        </Row>
      </Container>
    </Card>
  );
};
const PredictionDisplay = (props) => {
  const [predictions, setPredictions] = useState(
    props.realTime ? null : props.prediction_data
  );

  useEffect(() => {
    if (props.realTime) {
      const doc = db.collection("users").doc(props.uid);
      const observer = doc.onSnapshot(
        (docSnapshot) => {
          console.log("Constant updating");
          var user = docSnapshot.data();
          setPredictions(user.prediction_data);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
      return observer;
    }
  });

  return predictions ? (
    <Container
      style={{
        backgroundColor: "white",
        margin: 0,
        padding: 0,
      }}
    >
      {predictions.map((p, i) => {
        return (
          <Row
            key={i}
            style={{
              margin: 4,
              padding: 0,
            }}
          >
            <PredictionTile prediction={p}></PredictionTile>
          </Row>
        );
      })}
    </Container>
  ) : null;
};
export default PredictionDisplay;
