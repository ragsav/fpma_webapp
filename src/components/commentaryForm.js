import { Card, Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import DatePicker from "react-date-picker";
const CommentaryForm = (props) => {
  const [symbol, setSymbol] = useState("");
  const [date, setDate] = useState(new Date());

  function handleSubmit(e) {
    e.preventDefault();
    // props.addTransaction({ symbol, shares, pricePerShare, date, buy });
  }
  function handleClear(e) {
    e.preventDefault();
    setDate(new Date());
    setSymbol("");
  }
  return (
    <div
      style={{
        margin: 0,
        padding: 12,
        textAlign: "left",
      }}
    >
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter Symbol"
            value={symbol}
            onChange={(e) => {
              setSymbol(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <DatePicker
            onChange={(e) => {
              setDate(e);
            }}
            value={date}
          />
        </Form.Group>

        <Row style={{ padding: 0, margin: 0, verticalAlign: "bottom" }}>
          <Button
            variant="dark"
            type="submit"
            style={{
              padding: "2px 16px 2px 16px",
              fontSize: 12,
              marginRight: 10,
            }}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </Button>
          <Button
            variant="outline-danger"
            type="submit"
            style={{
              padding: "2px 16px 2px 16px",
              fontSize: 12,
              marginRight: 10,
            }}
            onClick={(e) => {
              handleClear(e);
            }}
          >
            Clear response
          </Button>
          <Button
            variant="outline-danger"
            type="submit"
            style={{ padding: "2px 16px 2px 16px", fontSize: 12 }}
            onClick={(e) => {
              e.preventDefault();
              props.onHide();
            }}
          >
            Close form
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default CommentaryForm;
