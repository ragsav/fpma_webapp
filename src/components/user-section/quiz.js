import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { db } from "../../firebase/firebase";

const Quiz = (props) => {
  var userInputArray = new Array(props.quiz.questions.length).fill(0);

  const [userInput, setUserInput] = useState(userInputArray);
  return (
    <Form style={{ height: 400, overflowY: "scroll" }}>
      {props.quiz.questions.map((q, i) => {
        const answers = q.answers;
        return (
          <div>
            <Form.Label>{q.question}</Form.Label>
            <Form.Group>
              {answers.map((ans, j) => {
                return (
                  <Form.Check
                    type="radio"
                    // value={}
                    name={`grp${i}`}
                    id={`default-${i}`}
                    label={`${ans}`}
                    onClick={() => {
                      userInput[i] = j;
                      setUserInput(userInput);
                    }}
                  />
                );
              })}
            </Form.Group>
          </div>
        );
      })}
      <Button
        onClick={props.onHide}
        variant="dark"
        type="submit"
        style={{
          padding: "2px 16px 2px 16px",
          fontSize: 12,
          margin: 0,
          marginRight: 20,
        }}
        onClick={(e) => {
          e.preventDefault();
          props.updateRiskScore(userInput);
          // db.collection("user")
          //   .doc("bgeKLVR19KQ31Sxz3B99GVYaAS82")
          //   .update("riskScore", userInput);
          props.onHide();
        }}
      >
        Submit quiz
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          props.onHide();
        }}
        variant="outline-danger"
        type="submit"
        style={{
          padding: "2px 16px 2px 16px",
          fontSize: 12,
          margin: 0,
          marginRight: 20,
        }}
      >
        Close quiz
      </Button>
    </Form>
  );
};

export default Quiz;
