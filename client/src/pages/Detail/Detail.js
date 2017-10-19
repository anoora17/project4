import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import candidateAPI from "../../utils/candidateAPI";
import DeleteBtn from "../../components/DeleteBtn";
import ReviewBtn from "../../components/ReviewBtn";
import reviewAPI from "../../utils/reviewAPI";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Modal from "react-modal";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Detail extends Component {
  constructor(props) {
    super(props)
  this.state = {
    candidate: {},
    CandisOpen: false

  }
  this.toggleModalReviewCand = this.toggleModalReviewCand.bind(this);
  };
  
  componentDidMount() {
    candidateAPI.getCandidate(this.props.match.params.id)
      .then(res => this.setState({ candidate: res.data }))
      .catch(err => console.log(err));
  }

  //function to set modal state for candidate review
  toggleModalReviewCand = () => {
      console.log(this.state.ReviewisOpen);
      this.setState({ReviewisOpen: !this.state.ReviewisOpen});
      console.log(this.state.ReviewisOpen);
    };

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
        <Modal isOpen={this.state.CandisOpen}
                  onRequestClose={this.toggleModalReviewCand}
                  contentLabel="Input Candidate Review"
                  style={customStyles}
                  >
                  <h2>Review for Candidate:</h2>
                  <h2>{this.state.firstname} {this.state.lastname}</h2>
                  <button onClick={this.toggleModalReviewCand}>close</button>
                  <div>Enter Review Here</div>
                  <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                  </form>
          </Modal>
        <Row>
          <Col size="md-12">
            <h2>Reviews for Candidate</h2>
            <h3>No Reviews on File</h3>
            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
