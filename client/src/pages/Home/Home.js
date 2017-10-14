import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";

const Home = () =>
  <Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h1>Welcome to ACME Inc. Resume Database</h1>
          <h1>
            ACME Inc. Resumes
          </h1>
        </Jumbotron>
      </Col>
    </Row>
  </Container>;

export default Home;