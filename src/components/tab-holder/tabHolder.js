import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Card,
  Button,
  ButtonGroup,
  Row,
} from "react-bootstrap";
import RecommendationDisplay from "./recommendationDisplay";
import TransactionsDisplay from "./transactionsDisplay";
import WatchListDisplay from "./watchListDisplay";

const TabHolder = (props) => {
  const [activeTab, setActiveTab] = useState(2);
  function onTransactionClick(e) {
    e.preventDefault();
    setActiveTab(2);
  }
  function onWatchListClick(e) {
    e.preventDefault();
    setActiveTab(0);
  }
  function onRecommendationClick(e) {
    e.preventDefault();
    setActiveTab(1);
  }
  function fetchTransactions() {}

  useEffect(() => {
    console.log("props user changed");
  }, [props]);
  return (
    <Card
      style={{
        borderWidth: 2,
        backgroundColor: "white",
        margin: 0,
        marginTop: 10,
        padding: 10,
        width: "100%",

        borderRadius: 4,
      }}
    >
      <Container style={{ margin: 0, padding: 0 }}>
        <Row style={{ margin: 0, padding: 0 }}>
          <ButtonGroup style={{ padding: 0, width: "100%", fontSize: 7 }}>
            <Button
              variant={activeTab === 0 ? "outline-dark" : "dark"}
              style={{
                paddingTop: 4,
                paddingBottom: 4,
                width: "33%",
                fontSize: 12,
              }}
              onClick={onWatchListClick}
            >
              Watch List
            </Button>
            <Button
              variant={activeTab === 1 ? "outline-dark" : "dark"}
              style={{
                paddingTop: 4,
                paddingBottom: 4,
                fontSize: 12,
                width: "33%",
              }}
              onClick={onRecommendationClick}
            >
              Recommendation List
            </Button>
            <Button
              variant={activeTab === 2 ? "outline-dark" : "dark"}
              style={{
                paddingTop: 4,
                paddingBottom: 4,
                width: "33%",
                fontSize: 12,
              }}
              onClick={onTransactionClick}
            >
              Transactions
            </Button>
          </ButtonGroup>
        </Row>
        <Row style={{ margin: 0, padding: 0, marginTop: 20 }}>
          {activeTab === 0 ? (
            <WatchListDisplay
              removeFromWishList={props.removeFromWishList}
              watch_list_symbols={props.watch_list_symbols}
            ></WatchListDisplay>
          ) : activeTab === 1 ? (
            <RecommendationDisplay
              recommendation_list={props.recommendation_list}
            ></RecommendationDisplay>
          ) : (
            <TransactionsDisplay
              transactions={props.transactions}
            ></TransactionsDisplay>
          )}
        </Row>
      </Container>
    </Card>
  );
};
export default TabHolder;
