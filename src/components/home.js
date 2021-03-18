import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  ToggleButton,
} from "react-bootstrap";

import { toast } from "react-toastify";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import NavBar from "./navBar";
import UserCard from "./userCard";
import SearchBar from "./search-bar/searchBar";
import ChartComponent from "./charts";
import { db } from "../firebase/firebase";
import TransactionsDisplay from "./tab-holder/transactionsDisplay";
import RecommendationDisplay from "./tab-holder/recommendationDisplay";
import WatchListDisplay from "./tab-holder/watchListDisplay";
import Report, { companyWiseStatus } from "./report/reportDisplay";
import CompanyWiseStatus from "./report/companyWiseStatus";
import { extractCompanyWiseReturn } from "./report/algorithms";
import PredictionDisplay from "./tab-holder/predictionDisplay";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";


const successToast = (msg) => {
  return toast.success(msg, {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const errorToast = (msg) => {
  return toast.error(msg, {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const Home = (props) => {

  const [user, setUser] = useState(null);
  const [currentSymbol, setCurrentSymbol] = useState("goog");
  const [watch_list_symbols, setWatchListSymbols] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [recommendation_list, setRecommendationList] = useState(null);
  const [prediction_data,setPredictionData]=useState(null);
  const [riskScore, setRiskScore] = useState(null);
  const [activeTab, setActiveTab] = useState(2);
  const [realTime, setRealTime] = useState(false);


  function handleLogout() {
    const { dispatch } = props;
    dispatch(logoutUser());
  }

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

  async function fetchUserFromFireStore() {
    if (props.user?.uid) {
      const ref = db.collection("users").doc(props.user.uid);
      const data = await ref.get();

      if (!data.exists) {
        //handle error
      } else {
        var dummy = data.data();
        dummy.email = props.user.email;
        setUser(dummy);
      }
    }
  }

  useEffect(() => {
    fetchUserFromFireStore();
  }, [props.user]);

  useEffect(() => {
    console.log("User changed ");
    console.log(user);
    if (user != null) {
      setWatchListSymbols(user.watch_list_symbols);
      setRecommendationList(user.recommendation_list);
      setTransactions(user.transactions);
      setPredictionData(user.prediction_data);
      setRiskScore(user.riskScore);
    }
  }, [user]);

  // useEffect(() => {
  //   extractCompanyWiseReturn(transactions);
  // }, [transactions]);

  function addToWatchList(sym) {
    var largerArray = [];
    if (user && watch_list_symbols) {
      largerArray = [...watch_list_symbols];
    }
    
    largerArray.push(sym);
    user.watch_list_symbols = [...largerArray];
    // console.log(user);
    db.collection("users")
      .doc(user.user_id)
      .update("watch_list_symbols", largerArray)
      .then((val) => {
        setUser(user);
        setWatchListSymbols(largerArray);
        successToast(`${sym} added to watch list`);
      })
      .catch((error) => {
        errorToast("Oops! Something went wrong");
      });
  }

  function removeFromWishList(sym) {
    var largerArray = [...watch_list_symbols];
    largerArray = largerArray.filter((e) => e !== sym);
    user.watch_list_symbols = [...largerArray];
    // console.log(user);

    db.collection("users")
      .doc(user.user_id)
      .update("watch_list_symbols", largerArray)
      .then((val) => {
        // console.log(user);
        setUser(user);
        setWatchListSymbols(largerArray);
        successToast(`${sym} removed from watch list`);
      })
      .catch((error) => {
        errorToast("Oops! Something went wrong");
      });
  }

  function addTransaction(transaction) {
    var largerArray = [];
    if (user && transactions) {
      largerArray = [...transactions];
    }
    
    largerArray.push(transaction);
    user.transactions = [...largerArray];
    // console.log(user);
    db.collection("users")
      .doc(user.user_id)
      .update("transactions", largerArray)
      .then((val) => {
        successToast("Transaction added");
        setUser(user);
        setTransactions(largerArray);
      })
      .catch((error) => {
        errorToast("Oops! Something went wrong");
      });
  }

  function removeFromTransactions(index) {
    var largerArray = [...transactions];
    largerArray.splice(index, 1);
    user.transactions = [...largerArray];
    console.log(largerArray);
    db.collection("users")
      .doc(user.user_id)
      .update("transactions", largerArray)
      .then((val) => {
        console.log(val);
        successToast(`Transaction removed`);
        setUser(user);
        setTransactions(largerArray);
      })
      .catch((error) => {
        errorToast("Oops! Something went wrong");
      });
  }

   function updateRiskScore(score) {
    var largerArray = [...score];

    user.riskScore = [...largerArray];
    console.log(largerArray);
    db.collection("users")
      .doc(user.user_id)
      .update("riskScore", largerArray)
      .then((val) => {
        // console.log(val);
        successToast(`Risk score added`);
        setUser(user);
        setRiskScore(largerArray);
        // setTransactions(largerArray);
      })
      .catch((error) => {
        errorToast("Oops! Something went wrong");
      });
  }

  // console.log(props);
  return (
    <Card style={{ width: "100%", padding: 10 }}>
      <Container
        style={{
          margin: "auto",
          padding: 0,
          width: "100%",
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Row
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <Col style={{ margin: 0, padding: 0 }}>
            <NavBar logOut={handleLogout}></NavBar>
          </Col>
        </Row>

        <Row style={{ margin: 0, padding: 4 }}>
          <Col style={{ margin: 0, padding: 4 }}>
            <SearchBar
              setCurrentSymbol={setCurrentSymbol}
              addToWatchList={addToWatchList}
            ></SearchBar>
          </Col>
        </Row>

        <Row style={{ margin: 0, padding: 4 }}>
          <Col style={{ margin: 0, padding: 4 }}>
            <ButtonGroup style={{ padding: 0, width: "70%", marginBottom: 10 }}>
              <Button
                variant="dark"
                style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
              >
                1D
              </Button>
              <Button
                variant="dark"
                style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
              >
                1W
              </Button>
              <Button
                variant="dark"
                style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
              >
                1M
              </Button>
              <Button
                variant="dark"
                style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
              >
                6M
              </Button>
              <Button
                variant="dark"
                style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
              >
                1Y
              </Button>
              <Button
                variant="dark"
                style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
              >
                2Y
              </Button>
              <Button
                variant="dark"
                style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
              >
                5Y
              </Button>
            </ButtonGroup>
          </Col>
        </Row>

        <Row style={{ margin: 0, padding: 4 }}>
          <Col style={{ margin: 0, padding: 4 }}>
            <ChartComponent symbol={currentSymbol}></ChartComponent>
          </Col>
        </Row>

        <Row style={{ margin: 0, padding: 4 }}>
          <Col style={{ margin: 0, padding: 4 }}>
            <UserCard
              user={user}
              addTransaction={addTransaction}
              updateRiskScore={updateRiskScore}
            ></UserCard>
          </Col>
        </Row>

        <Row style={{ margin: 0, padding: 4 }}>
          <Col style={{ margin: 0, padding: 4 }}>
            {user ? (
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
                    <FormControlLabel
                      style={{ float: "left" }}
                      control={
                        <Switch
                          checked={realTime}
                          name="jason"
                          onChange={() => {
                            setRealTime(!realTime);
                          }}
                        />
                      }
                      label="Set realtime update?"
                    />
                  </Col>
                </Row>
                <Container style={{ margin: 0, padding: 0 }}>
                  <Row style={{ margin: 0, padding: 0 }}>
                    <ButtonGroup
                      style={{ padding: 0, width: "100%", fontSize: 7 }}
                    >
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
                      <Button
                        variant={activeTab === 3 ? "outline-dark" : "dark"}
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
                  <Row style={{ margin: 0, padding: 0, marginTop: 20 }}>
                    {activeTab === 0 ? (
                      <WatchListDisplay
                        removeFromWishList={removeFromWishList}
                        uid={user.user_id}
                        realTime={realTime}
                        watch_list_symbols={watch_list_symbols}
                      ></WatchListDisplay>
                    ) : activeTab === 1 ? (
                      <RecommendationDisplay
                        uid={user.user_id}
                        realTime={realTime}
                        recommendation_list={recommendation_list}
                      ></RecommendationDisplay>
                    ) : activeTab === 2 ? (
                      <TransactionsDisplay
                        transactions={transactions}
                        removeFromTransactions={removeFromTransactions}
                        uid={user.user_id}
                        realTime={realTime}
                      ></TransactionsDisplay>
                    ) : (
                      <PredictionDisplay
                        prediction_data={prediction_data}
                        uid={user.user_id}
                        realTime={realTime}
                      ></PredictionDisplay>
                    )}
                  </Row>
                </Container>
              </Card>
            ) : null}
          </Col>
        </Row>

        <Row style={{ margin: 0, padding: 4 }}>
          <Col style={{ margin: 0, padding: 4 }}>
            <Card style={{ padding: 0, margin: 0, borderWidth: 2 }}>
              <Report transactions={transactions}></Report>
            </Card>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    user: state.auth.user,
  };
}
export default connect(mapStateToProps)(Home);
