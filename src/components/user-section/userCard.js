import { useEffect, useState } from "react";
import { Col, Container, Card, Row, Button, Modal } from "react-bootstrap";
import CommentaryForm from "./commentaryForm";
import { quiz } from "./quizData";
import Quiz from "./quiz";
import RecommendationForm from "./recommendationForm";
import TransactionForm from "./transactionForm";

function QuizModal(props) {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton style={{ fontWeight: "700" }}>
        Risk Survey
      </Modal.Header>
      <Modal.Body>
        <Quiz
          quiz={quiz}
          onHide={props.onHide}
          updateRiskScore={props.updateRiskScore}
        ></Quiz>
      </Modal.Body>
    </Modal>
  );
}
function TransactionModal(props) {
  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton style={{ fontWeight: "700" }}>
        TransactionForm
      </Modal.Header>
      <Modal.Body>
        <TransactionForm
          onHide={props.onHide}
          addTransaction={props.addTransaction}
        ></TransactionForm>
      </Modal.Body>
    </Modal>
  );
}
function CommentaryModal(props) {
  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton style={{ fontWeight: "700" }}>
        Commentary Form
      </Modal.Header>
      <Modal.Body>
        <CommentaryForm onHide={props.onHide} uid={props.uid}></CommentaryForm>
      </Modal.Body>
    </Modal>
  );
}
function RecommendationModal(props) {
  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton style={{ fontWeight: "700" }}>
        Recommendation Form
      </Modal.Header>
      <Modal.Body>
        <RecommendationForm
          onHide={props.onHide}
          uid={props.uid}
        ></RecommendationForm>
      </Modal.Body>
    </Modal>
  );
}

const UserCard = (props) => {
  const [riskSurveyModalShow, setRiskSurveyModalShow] = useState(false);
  const [transactionModalShow, setTransactionModalShow] = useState(false);
  const [commentaryModalShow, setCommentaryModalShow] = useState(false);
  const [recommendationModalShow, setRecommendationModalShow] = useState(false);

  return props.user ? (
    <Card
      style={{
        borderWidth: 2,
        backgroundColor: "white",
        margin: 0,
        padding: 10,
        width: "100%",

        borderRadius: 4,
      }}
    >
      <Container
        style={{
          backgroundColor: "white",
          margin: 0,
          padding: 0,
        }}
      >
        <Row
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <Col
            style={{
              textAlign: "left",
              fontSize: 12,
              fontWeight: "700",
              padding: 4,
            }}
          >
            {`Name : ${props.user.name}`}
          </Col>
          <Col style={{ textAlign: "right", fontSize: 12, padding: 4 }}>
            {props.user.user_id}
          </Col>
        </Row>
        <Row
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <Col
            style={{
              fontWeight: "700",
              textAlign: "left",
              fontSize: 12,
              padding: 4,
            }}
          >
            {`Email : ${props.user.email}`}
          </Col>
        </Row>
        <Row
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <Card
            style={{
              margin: 0,
              height: 1,
              width: "100%",
            }}
          ></Card>
        </Row>
        <Row
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <Col
            style={{
              fontWeight: "700",
              textAlign: "left",
              fontSize: 12,
              padding: 4,
            }}
          >
            {props.user.category === ""
              ? "Take risk survey to for stock suggestions"
              : `Your risk type is : ${props.user.category}`}
          </Col>
          <Col style={{ textAlign: "right", fontSize: 12, padding: 4 }}>
            <Button
              variant="dark"
              type="submit"
              style={{
                width: "50%",
                padding: "2px 16px 2px 16px",
                fontSize: 12,
                margin: 0,
              }}
              onClick={() => setRiskSurveyModalShow(true)}
            >
              Take risk survey
            </Button>
            <QuizModal
              show={riskSurveyModalShow}
              onHide={() => setRiskSurveyModalShow(false)}
              updateRiskScore={props.updateRiskScore}
            />
          </Col>
        </Row>
        <Row
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <Card
            style={{
              margin: 0,
              height: 1,
              width: "100%",
            }}
          ></Card>
        </Row>
        <Row
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <Col
            style={{
              fontWeight: "700",
              textAlign: "left",
              fontSize: 12,
              padding: 4,
            }}
          >
            {"Get commentary for any stock"}
          </Col>
          <Col style={{ textAlign: "right", fontSize: 12, padding: 4 }}>
            <Button
              variant="dark"
              type="submit"
              style={{
                width: "50%",
                padding: "2px 16px 2px 16px",
                fontSize: 12,
                margin: 0,
              }}
              onClick={() => setCommentaryModalShow(true)}
            >
              Commentary form
            </Button>
            <CommentaryModal
              show={commentaryModalShow}
              uid={props.user.user_id}
              onHide={() => setCommentaryModalShow(false)}
            />
          </Col>
        </Row>
        <Row
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <Card
            style={{
              margin: 0,
              height: 1,
              width: "100%",
            }}
          ></Card>
        </Row>
        <Row
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <Col
            style={{
              fontWeight: "700",
              textAlign: "left",
              fontSize: 12,
              padding: 4,
            }}
          >
            {"Add the transaction you did to get report"}
          </Col>
          <Col style={{ textAlign: "right", fontSize: 12, padding: 4 }}>
            <Button
              variant="dark"
              type="submit"
              style={{
                width: "50%",
                padding: "2px 16px 2px 16px",
                fontSize: 12,
                margin: 0,
              }}
              onClick={() => setTransactionModalShow(true)}
            >
              Transaction form
            </Button>
            <TransactionModal
              show={transactionModalShow}
              addTransaction={props.addTransaction}
              onHide={() => setTransactionModalShow(false)}
            />
          </Col>
        </Row>
        <Row
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <Card
            style={{
              margin: 0,
              height: 1,
              width: "100%",
            }}
          ></Card>
        </Row>
        <Row
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <Col
            style={{
              fontWeight: "700",
              textAlign: "left",
              fontSize: 12,
              padding: 4,
            }}
          >
            {"Get recommendation values for stocks"}
          </Col>
          <Col style={{ textAlign: "right", fontSize: 12, padding: 4 }}>
            <Button
              variant="dark"
              type="submit"
              style={{
                width: "50%",
                padding: "2px 16px 2px 16px",
                fontSize: 12,
                margin: 0,
              }}
              onClick={() => setRecommendationModalShow(true)}
            >
              Recommendation form
            </Button>
            <RecommendationModal
              show={recommendationModalShow}
              uid={props.user.user_id}
              onHide={() => setRecommendationModalShow(false)}
            />
          </Col>
        </Row>
        <Row
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <Card
            style={{
              margin: 0,
              height: 1,
              width: "100%",
            }}
          ></Card>
        </Row>
      </Container>
    </Card>
  ) : null;
};
export default UserCard;
