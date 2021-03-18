import { useEffect, useState } from "react";
import { Col, Container, Card, Row, Button } from "react-bootstrap";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { db } from "../../firebase/firebase";

const TransactionTile = (props) => {
  const t = props.transaction;
  var d = new Date(1970, 0, 1); // Epoch
  d.setSeconds(t["date"].seconds);

  // console.log(props);

  return (
    <Card
      style={{
        backgroundColor: t.buy === false ? "#c9ffd8" : "#fffea8",
        border: t.buy === false ? `2px solid green` : `2px solid orange`,
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <Container>
        <Row style={{ margin: 0, padding: 0 }}>
          <Col style={{ margin: 0, padding: 0 }}>
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
                style={{
                  textAlign: "left",
                  fontSize: 12,
                  padding: 4,
                  margin: 0,
                }}
              >
                {d.toDateString()}
              </Col>
              <Col
                style={{
                  textAlign: "right",
                  fontSize: 12,
                  padding: 4,
                  margin: 0,
                }}
              >
                {`${t["pricePerShare"]} Rupees/share`}
              </Col>
            </Row>
          </Col>
          <Col
            style={{
              width: 100,
              fontWeight: "700",
              textAlign: "right",
              fontSize: 12,
              padding: 0,
              margin: 0,
            }}
          >
            <Button
              variant="danger"
              style={{
                padding: 4,
                margin: 10,
              }}
              onClick={(e) => {
                e.preventDefault();
                console.log(props.index + " to be removed");
                props.removeFromTransactions(parseInt( props.index));
              }}
            >
              <DeleteOutlineIcon></DeleteOutlineIcon>
            </Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};
const TransactionsDisplay = (props) => {
  const [transactions,setTransactions]=useState(
    props.realTime ? null : props.transactions
  );
  useEffect(() => {
    if(props.realTime){
      const doc = db.collection("users").doc(props.uid);
      const observer = doc.onSnapshot(
        (docSnapshot) => {
          //   console.log();
          var user = docSnapshot.data();
          setTransactions(user.transactions);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
      return observer;
    }
  });

  // function removeFromTransactions(date) {
  //   var largerArray = [...transactions];
  //   largerArray = largerArray.filter((e) => e.date !== date);

    
  //   db.collection("users")
  //     .doc(props.uid)
  //     .update("transactions", largerArray)
  //     .then((val) => {
  //       successToast(`Transaction removed`);
  //     })
  //     .catch((error) => {
  //       errorToast("Oops! Something went wrong");
  //     });
  // }
  return transactions ? (
    <Container
      style={{
        backgroundColor: "white",
        margin: 0,
        padding: 0,
      }}
    >
      {transactions.map((t, i) => {
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
            <TransactionTile
              transaction={t}
              index={i}
              removeFromTransactions={props.removeFromTransactions}
            ></TransactionTile>
          </Row>
        );
      })}
    </Container>
  ) : null;
};
export default TransactionsDisplay;
