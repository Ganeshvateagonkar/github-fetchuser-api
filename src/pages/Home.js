import React, { useState, useContext } from "react";
import Axios from "axios";

import {
  Row,
  Container,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupText,
} from "reactstrap";

import UserCard from "../components/userCard";
import Repos from "../components/Repos";

import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Home = () => {
  const context = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [user, setuser] = useState(null);
  const fetchDetails = async () => {
    try {
      const { data } = await Axios.get(`https://api.github.com/users/${query}`);
      setuser(data);
      console.log({ data });
      setQuery("");
    } catch (error) {
      toast("Not able to fetch user", { type: "error" });
    }
  };

  //useEffect(() => {}, []);

  if (!context.user?.uid) {
    return <Navigate replace to="/signin" />;
  }

  return (
    <Container>
      <Row className=" mt-3">
        <Col md="5">
          <InputGroup>
            <Input
              type="text"
              value={query}
              placeholder="Please provide the username"
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupText>
              <Button onClick={fetchDetails} color="primary">
                Fetch User
              </Button>
            </InputGroupText>
          </InputGroup>
          {user ? <UserCard user={user} /> : null}
        </Col>
        <Col md="7">{user ? <Repos repos_url={user.repos_url} /> : null}</Col>
      </Row>
    </Container>
  );
};

export default Home;
