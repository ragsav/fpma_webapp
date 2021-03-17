import { useEffect, useState } from "react";
import { Col, Container, Card, Row, Button } from "react-bootstrap";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const WatchListTile = (props) => {
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
                padding: "0px 8px 0px 8px",
                margin: 0,
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
  useEffect(() => {
    //
  }, [props.watch_list_symbols]);

  return props.watch_list_symbols ? (
    <Container
      style={{
        backgroundColor: "white",
        margin: 0,
        padding: 0,
      }}
    >
      {props.watch_list_symbols.map((w, i) => {
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
