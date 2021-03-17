import { Card, Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";

const RecommendationForm = (props) => {
  const [symbolString, setSymbolString] = useState("");
  const [amount, setAmount] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    // props.addTransaction({ symbol, shares, pricePerShare, date, buy });
  }
  function handleClear(e) {
    e.preventDefault();
    setSymbolString("");
    setAmount(0);
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
        <Form.Group controlId="formSymbols">
          <Form.Control
            type="text"
            placeholder="Enter , separated symbols"
            value={symbolString}
            onChange={(e) => {
              setSymbolString(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formAmount">
          <Form.Control
            type="number"
            placeholder="Enter amount to invest"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
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

export default RecommendationForm;
