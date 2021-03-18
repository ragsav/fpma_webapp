import { Card, Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import DatePicker from "react-date-picker";
const axios = require("axios");
const CommentaryForm = (props) => {
  const [symbol, setSymbol] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("https://morning-sea-27341.herokuapp.com/api/prediction", {
        uid: props.uid,
        st_name: symbol,
        start: `${startDate.getFullYear()} ${startDate.getMonth()} ${startDate.getDay()}`,
        end: `${endDate.getFullYear()} ${endDate.getMonth()} ${endDate.getDay()}`,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }
  function handleClear(e) {
    e.preventDefault();
    setStartDate(new Date());
    setEndDate(new Date());
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
              setStartDate(e);
            }}
            value={startDate}
          />
          <Form.Label style={{ margin: 5 }}>Start date</Form.Label>
        </Form.Group>
        <Form.Group>
          <DatePicker
            onChange={(e) => {
              setEndDate(e);
            }}
            value={endDate}
          />
          <Form.Label style={{ margin: 5 }}>End date</Form.Label>
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
