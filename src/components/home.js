import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
} from "react-bootstrap";

import { toast } from "react-toastify";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import NavBar from "./navBar";
import UserCard from "./user-section/userCard";
import SearchBar from "./search-bar/searchBar";
import { db } from "../firebase/firebase";
import Report from "./report/reportDisplay";
import CandleStick from "./charts/candleStick";
import LineChart from "./charts/lineChart";
import TabHolder from "./tab-holder/tabHolder";


const successToast = (msg) => {
  return toast.success(msg, {
    position: "top-center",
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
    position: "top-center",
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
  const [currentSymbol, setCurrentSymbol] = useState("500087.BSE");
  const [chartType, setChartType] = useState("both");


  function handleLogout() {
    const { dispatch } = props;
    dispatch(logoutUser());
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
        setUser({...dummy});
      }
    }
  }

  useEffect(() => {
    fetchUserFromFireStore();
  }, [props.user]);

  // useEffect(() => {
  //   console.log(user);
  //   if (user != null) {
  //     setWatchListSymbols(user.watch_list_symbols);
  //     setTransactions(user.transactions);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   console.log("watch list changed");
  // }, [watch_list_symbols]);
  // useEffect(() => {
  //   console.log("transaction list changed");
  // }, [transactions]);
  // useEffect(() => {
  //   console.log("prediction list changed");
  // }, [prediction_data]);
  // useEffect(() => {
  //   console.log("recommended list changed");
  // }, [recommendation_list]);

  function addToWatchList(sym) {
    var largerArray = [];
    if (user && user.watch_list_symbols) {
      largerArray = [...user.watch_list_symbols];
    }
    
    largerArray.push(sym);
    user.watch_list_symbols = [...largerArray];
    db.collection("users")
      .doc(user.user_id)
      .update("watch_list_symbols", largerArray)
      .then((val) => {
        setUser({...user});
        successToast(`${sym} added to watch list`);
      })
      .catch((error) => {
        console.log(error)
        errorToast("Oops! Something went wrong");
      });
  }

  function removeFromWishList(sym) {
    var largerArray = [...user.watch_list_symbols];
    largerArray = largerArray.filter((e) => e !== sym);
    user.watch_list_symbols = [...largerArray];

    db.collection("users")
      .doc(user.user_id)
      .update("watch_list_symbols", largerArray)
      .then((val) => {

        setUser({ ...user });        
        successToast(`${sym} removed from watch list`);
      })
      .catch((error) => {
        errorToast("Oops! Something went wrong");
      });
  }

  function addTransaction(transaction) {
    var largerArray = [];
    if (user && user.transactions) {
      largerArray = [...user.transactions];
    }
    
    largerArray.push(transaction);
    user.transactions = [...largerArray];
    db.collection("users")
      .doc(user.user_id)
      .update("transactions", largerArray)
      .then((val) => {
        successToast("Transaction added");

        setUser({ ...user });        
      })
      .catch((error) => {
        errorToast("Oops! Something went wrong");
      });
  }

  function removeFromTransactions(index) {
    var largerArray = [...user.transactions];
    largerArray.splice(index, 1);
    user.transactions = [...largerArray];
    db.collection("users")
      .doc(user.user_id)
      .update("transactions", largerArray)
      .then((val) => {
        successToast(`Transaction removed`);
        setUser({ ...user });
      })
      .catch((error) => {
        errorToast("Oops! Something went wrong");
      });
  }

   function updateRiskScore(score) {
    var largerArray = [...score];

    user.riskScore = [...largerArray];
    db.collection("users")
      .doc(user.user_id)
      .update("riskScore", largerArray)
      .then((val) => {
        successToast(`Risk score added`);
        setUser({ ...user });
      })
      .catch((error) => {
        errorToast("Oops! Something went wrong");
      });
  }

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

        <Row style={{ margin: "auto", padding: 4, width: "70%" }}>
          <Col style={{ margin: 0, padding: 4 }}>
            <ButtonGroup
              style={{ padding: 0, width: "100%", marginBottom: 10 }}
            >
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
          <Col style={{ margin: 0, padding: 4 }}>
            <ButtonGroup
              style={{ padding: 0, width: "100%", marginBottom: 10 }}
            >
              <Button
                variant={chartType === "candle" ? "dark" : "secondary"}
                style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
                onClick={(e) => {
                  e.preventDefault();
                  setChartType("candle");
                }}
              >
                CandleStick
              </Button>
              <Button
                variant={chartType === "line" ? "dark" : "secondary"}
                style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
                onClick={(e) => {
                  e.preventDefault();
                  setChartType("line");
                }}
              >
                Line Chart
              </Button>
              <Button
                variant={chartType === "both" ? "dark" : "secondary"}
                style={{ paddingTop: 4, paddingBottom: 4, fontSize: 12 }}
                onClick={(e) => {
                  e.preventDefault();
                  setChartType("both");
                }}
              >
                Both
              </Button>
            </ButtonGroup>
          </Col>
        </Row>


        {chartType === "line" ? null:(
          <Row style={{ margin: 0, padding: 4 }} >
            <Col style={{ margin: 0, padding: 4 }}>
              <Card style={{ padding: 0, margin: 0, borderWidth: 2 }}>
                <CandleStick symbol={currentSymbol}></CandleStick>
              </Card>
            </Col>
          </Row>
        ) }
        {chartType === "candle" ? null:(
          <Row style={{ margin: 0, padding: 4 }}>
            <Col style={{ margin: 0, padding: 4 }}>
              <Card style={{ padding: 0, margin: 0, borderWidth: 2 }}>
                <LineChart symbol={currentSymbol}></LineChart>
              </Card>
            </Col>
          </Row>
        )}


        <Row style={{ margin: 0, padding: 4 }}>
          <Col style={{ margin: 0, padding: 4 }}>
            {user?<UserCard
              user={user}
              addTransaction={addTransaction}
              updateRiskScore={updateRiskScore}
            ></UserCard>:null}
          </Col>
        </Row>


        <Row style={{ margin: 0, padding: 4 }}>
          <Col style={{ margin: 0, padding: 4 }}>
            {user ?<TabHolder user = {user} removeFromWishList = {removeFromWishList} removeFromTransactions = {removeFromTransactions}>

            </TabHolder>:null}
            </Col>
        </Row>

      
        <Row style={{ margin: 0, padding: 4 }}>
          <Col style={{ margin: 0, padding: 4 }}>
            {user?<Card style={{ padding: 0, margin: 0, borderWidth: 2 }}>
              <Report
                transactions={user.transactions}
                recommended_stocks={user.recommended_stocks}
                recommended_stock_weights={user.recommended_stock_weights}
              ></Report>
            </Card>:null}
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
