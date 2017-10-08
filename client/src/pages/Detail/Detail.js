import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import candidateAPI from "../../utils/candidateAPI";

class Detail extends Component {
  state = {
    candidate: {}
  };
  
  componentDidMount() {
    candidateAPI.getCandidate(this.props.match.params.id)
      .then(res => this.setState({ candidate: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Candidate: {this.state.candidate.firstname} {this.state.candidate.lastname}
                Email: {this.state.candidate.email} 
                Position Type: {this.state.candidate.position_type}

              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Resume Snippet</h1>
              <p>
                {this.state.candidate.resume_text}
              </p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Candidates</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
