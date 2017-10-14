import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";

const Home = () =>
  <Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h2>Welcome to ACME Inc. Resume Database</h2>
          
        </Jumbotron>
      </Col>
    </Row>
  </Container>;

export default Home;