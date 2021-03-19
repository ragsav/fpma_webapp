import { useEffect, useState } from "react";
import { Col, Container, Card, Row, Button } from "react-bootstrap";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { db } from "../../firebase/firebase";


const WatchListTile = (props) => {
  return (
    <Card
      style={{
        backgroundColor: "#c9ffd8",
        border: `2px solid green`,
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
              margin: "auto",
            }}
          >
            {props.watch_list_symbol}
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
            <Button
              variant="danger"
              style={{
                padding: 4,
                margin: 5,
              }}
              onClick={() => {
                props.removeFromWishList(props.watch_list_symbol);
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
const WatchListDisplay = (props) => {
  const [watch_list_symbols, setWatchListSymbols] = useState(
    props.watch_list_symbols
  );

  useEffect(() => {
    setWatchListSymbols(props.watch_list_symbols);
  }, [props.watch_list_symbols]);
  useEffect(() => {
    if (props.realTime) {
      const doc = db.collection("users").doc(props.uid);
      const observer = doc.onSnapshot(
        (docSnapshot) => {
          var user = docSnapshot.data();
          setWatchListSymbols(user.watch_list_symbols);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
      return observer;
    }
  });

  // function removeFromWishList(sym) {
  //   var largerArray = [...watch_list_symbols];
  //   largerArray = largerArray.filter((e) => e !== sym);

  //   db.collection("users")
  //     .doc(props.uid)
  //     .update("watch_list_symbols", largerArray)
  //     .then((val) => {
  //       successToast(`${sym} removed from watch list`);
  //     })
  //     .catch((error) => {
  //       errorToast("Oops! Something went wrong");
  //     });
  // }
  return watch_list_symbols ? (
    <Container
      style={{
        backgroundColor: "white",
        margin: 0,
        padding: 0,
      }}
    >
      {watch_list_symbols.map((w, i) => {
        return (
          <Row
            key={i}
            style={{
              margin: 4,
              padding: 0,
            }}
          >
            <WatchListTile
              watch_list_symbol={w}
              removeFromWishList={props.removeFromWishList}
            ></WatchListTile>
          </Row>
        );
      })}
    </Container>
  ) : null;
};
export default WatchListDisplay;
