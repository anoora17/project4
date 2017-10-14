import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import candidateAPI from "../../utils/candidateAPI";
import DeleteBtn from "../../components/DeleteBtn";
import ReviewBtn from "../../components/ReviewBtn";
import Modal from "../../components/Modal";
import reviewAPI from "../../utils/reviewAPI";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";


class Detail extends Component {
  state = {
    candidate: {},
    review: []
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
              <h2>

                Candidate: {this.state.candidate.firstname} {this.state.candidate.lastname}
                Email: {this.state.candidate.email} 
                Position Type: {this.state.candidate.position_type}

              </h2>
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
            <Link to="/candidates">← Back to Candidates</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
