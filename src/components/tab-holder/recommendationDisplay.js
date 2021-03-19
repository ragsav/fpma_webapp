import { useEffect, useState } from "react";
import { Col, Container, Card, Row } from "react-bootstrap";
import { db } from "../../firebase/firebase";
export const RecommendationTile = (props) => {
  var r = props.recommendation.split(",");
  var sym = r[0];
  var w = Math.round(parseFloat(r[1]) * 100);
  var ret = parseFloat(r[2]  ?  r[2]  :  0) * 252;
  var risk = parseFloat(r[3]  ?  r[3]  :  0) * Math.sqrt(252);

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
            {sym}
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
            {w}
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
            {`Returns for one year : ${ret}`}
          </Col>
          <Col
            style={{ textAlign: "right", fontSize: 12, padding: 4, margin: 0 }}
          >
            {`Risk for one year : ${risk}`}
          </Col>
        </Row>
      </Container>
    </Card>
  );
};
const RecommendationDisplay = (props) => {
  

  const [recommendation_list, setRecommendationList] = useState(
    props.recommendation_list
  );
  

  useEffect(()=>{
    setRecommendationList(props.recommendation_list)
  },[props.recommendation_list])
  useEffect(() => {
    if (props.realTime) {
      const doc = db.collection("users").doc(props.uid);
      const observer = doc.onSnapshot(
        (docSnapshot) => {
          var user = docSnapshot.data();
          setRecommendationList(user.recommendation_list);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
      return observer;
    }
  });
  

  return recommendation_list ? (
    <Container
      style={{
        backgroundColor: "white",
        margin: 0,
        padding: 0,
      }}
    >
      {recommendation_list.map((r, i) => {
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
