import { Card, Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import DatePicker from "react-date-picker";
const TransactionForm = (props) => {
  const [symbol, setSymbol] = useState("");
  const [shares, setShares] = useState(0);
  const [pricePerShare, setPricePerShare] = useState(0);
  const [date, setDate] = useState(new Date());
  const [buy, setBuy] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    props.addTransaction({ symbol, shares, pricePerShare, date, buy });
  }
  function handleClear(e) {
    e.preventDefault();
    setDate(new Date());
    setPricePerShare(0);
    setSymbol("");
    setShares(0);
  }
  return (
    <div style={{ margin: 0, padding: 12, textAlign: "left" }}>
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

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="number"
            placeholder="Shares purchased"
            value={shares}
            onChange={(e) => {
              setShares(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Value of share"
            value={pricePerShare}
            onChange={(e) => {
              setPricePerShare(e.target.value);
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
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Buy"
            checked={buy}
            onClick={(e) => {
              setBuy(!buy);
            }}
          />
        </Form.Group>
        <Row style={{ padding: 0, margin: 0 }}>
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

export default TransactionForm;
