import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Quiz = (props) => {
  var userInputArray = new Array(props.quiz.questions.length).fill(0);

  const [userInput, setUserInput] = useState(userInputArray);
  console.log(props.quiz.questions);
  return (
    <Form>
      {props.quiz.questions.map((q, i) => {
        console.log(q.answers);
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
                      console.log("chnaged");
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
          console.log(userInputArray);
          props.updateRiskScore(userInput);
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
        variant="dark"
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
