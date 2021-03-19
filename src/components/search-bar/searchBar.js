import { useState } from "react";
import {
  InputGroup,
  Button,
  FormControl,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import SearchResult from "./searchResult";
const alpha = require("alphavantage")({ key: "B02L3PBPXDL1PUY4" });
const SearchBar = (props) => {
  const [currentSymbol, setCurrentSymbol] = useState("goog");
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    alpha.data.search(query).then((data) => {
      setSearchResult(data.bestMatches);
    });
  }

  function handleAddToWishList(e) {
    e.preventDefault();
    props.addToWatchList(currentSymbol);
  }
  return (
    <Row
      style={{
        margin: 0,
        padding: "8px 16px 8px 16px",
        backgroundColor: "white",
      }}
    >
      <Col
        style={{
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
          <InputGroup className="mb-3">
            <FormControl
              placeholder="500087.BSE"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={handleAddToWishList}>
                Add to Wishlist
              </Button>
              <Button variant="dark" onClick={handleSubmit}>
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
        <Row
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          {searchResult.length != 0 ? (
            <Container
              style={{
                padding: 4,
                margin: 0,

                maxHeight: 200,
                overflowY: "scroll",
              }}
            >
              {searchResult.map((s, i) => {
                return (
                  <SearchResult
                    symbol={s["1. symbol"]}
                    name={s["2. name"]}
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentSymbol(s["1. symbol"]);
                      setQuery(s["1. symbol"]);
                      props.setCurrentSymbol(s["1. symbol"]);
                      setSearchResult([]);
                    }}
                  ></SearchResult>
                );
              })}
            </Container>
          ) : null}
        </Row>
      </Col>
    </Row>
  );
};

export default SearchBar;
