import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
} from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AntSwitch from "../antSwitch";
import TransactionsDisplay from "./transactionsDisplay";
import RecommendationDisplay from "./recommendationDisplay";
import WatchListDisplay from "./watchListDisplay";
import PredictionDisplay from "./predictionDisplay";

const TabHolder = (props) => {
  const [user, setUser] = useState(null);
  const [watch_list_symbols, setWatchListSymbols] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [recommendation_list, setRecommendationList] = useState(null);
  const [prediction_data, setPredictionData] = useState(null);
  const [activeTab, setActiveTab] = useState(2);
  const [realTime, setRealTime] = useState(false);

  useEffect(() => {
    if (props.user != null) {
      setUser(props.user);
      setWatchListSymbols(props.user.watch_list_symbols);
      setRecommendationList(props.user.recommendation_list);
      setTransactions(props.user.transactions);
      setPredictionData(props.user.prediction_data);
    }
  }, [props.user]);

  function onTransactionClick(e) {
    e.preventDefault();
    setActiveTab(2);
  }

  function onPredictionClick(e) {
    e.preventDefault();
    setActiveTab(3);
  }

  function onWatchListClick(e) {
    e.preventDefault();
    setActiveTab(0);
  }

  function onRecommendationClick(e) {
    e.preventDefault();
    setActiveTab(1);
  }

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
      <Row style={{ margin: 0, padding: 4 }}>
        <Col style={{ margin: 0, padding: 4 }}>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item style={{ fontSize: 12, fontWeight: "600" }}>
                Off
              </Grid>
              <Grid item>
                <AntSwitch
                  checked={realTime}
                  onChange={() => {
                    setRealTime(!realTime);
                  }}
                  name="realtime"
                />
              </Grid>
              <Grid item style={{ fontSize: 12, fontWeight: "600" }}>
                On : Realtime updates
              </Grid>
            </Grid>
          </Typography>
        </Col>
      </Row>

      <Container style={{ margin: 0, padding: 0 }}>
        <Row style={{ margin: 0, padding: 0 }}>
          <ButtonGroup style={{ padding: 0, width: "100%", fontSize: 7 }}>
            <Button
              variant={activeTab === 0 ? "dark" : "secondary"}
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
              variant={activeTab === 1 ? "dark" : "secondary"}
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
              variant={activeTab === 2 ? "dark" : "secondary"}
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
            <Button
              variant={activeTab === 3 ? "dark" : "secondary"}
              style={{
                paddingTop: 4,
                paddingBottom: 4,
                width: "33%",
                fontSize: 12,
              }}
              onClick={onPredictionClick}
            >
              Predictions
            </Button>
          </ButtonGroup>
        </Row>

        {user ? (
          <Row
            style={{
              margin: 0,
              padding: 0,
              marginTop: 20,
              overflowY: "scroll",
              maxHeight: 600,
            }}
          >
            {activeTab === 0 ? (
              watch_list_symbols ? (
                <WatchListDisplay
                  removeFromWishList={props.removeFromWishList}
                  uid={user.user_id}
                  realTime={realTime}
                  watch_list_symbols={watch_list_symbols}
                ></WatchListDisplay>
              ) : null
            ) : activeTab === 1 ? (
              recommendation_list ? (
                <RecommendationDisplay
                  uid={user.user_id}
                  realTime={realTime}
                  recommendation_list={recommendation_list}
                ></RecommendationDisplay>
              ) : null
            ) : activeTab === 2 ? (
              transactions ? (
                <TransactionsDisplay
                  transactions={transactions}
                  removeFromTransactions={props.removeFromTransactions}
                  uid={user.user_id}
                  realTime={realTime}
                ></TransactionsDisplay>
              ) : null
            ) : prediction_data ? (
              <PredictionDisplay
                prediction_data={prediction_data}
                uid={user.user_id}
                realTime={realTime}
              ></PredictionDisplay>
            ) : null}
          </Row>
        ) : null}
      </Container>
    </Card>
  );
};

export default TabHolder;
