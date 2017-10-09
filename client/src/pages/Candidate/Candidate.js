import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import ReviewBtn from "../../components/ReviewBtn";
import Modal from "../../components/Modal";
import Jumbotron from "../../components/Jumbotron";
import candidateAPI from "../../utils/candidateAPI";
import reviewAPI from "../../utils/reviewAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";


class Candidates extends Component {
  state = {
    candidates: [],
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    position_type: "",
    resume_url: "",
    resume_text: ""
    };

  componentDidMount() {
    this.loadCandidates();
  }

  loadCandidates = () => {
    candidateAPI.getCandidates()
      .then(res =>
        this.setState({ candidates: res.data, firstname: "", lastname: "", email: "", address: "", city: "", state: "", zipcode: "", position_type: "", resume_url: "", resume_text: "" })
      )
      .catch(err => console.log(err));
  };

  deleteCandidate = id => {
    candidateAPI.deleteCandidate(id)
      .then(res => this.loadCandidates())
      .catch(err => console.log(err));
  };

  reviewCandidate = id => {
    
    reviewAPI.saveReview(id)
      .then(res => this.loadCandidates())
      .catch(err => console.log(err));

  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.firstname && this.state.lastname && this.state.email && this.state.position_type && this.state.resume_url) {
      candidateAPI.saveCandidate({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        position_type: this.state.position_type,
        resume_url: this.state.resume_url,
        resume_text: this.state.resume_text
      })
        .then(res => this.loadCandidates())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Enter New Candidate</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.firstname}
                onChange={this.handleInputChange}
                name="firstname"
                placeholder="Firstname (required)"
              />
              <Input
                value={this.state.lastname}
                onChange={this.handleInputChange}
                name="lastname"
                placeholder="Lastname (required)"
              />
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="Email (required)"
              />
              <Input
                value={this.state.address}
                onChange={this.handleInputChange}
                name="address"
                placeholder="Address (Optional)"
              />
              <Input
                value={this.state.city}
                onChange={this.handleInputChange}
                name="city"
                placeholder="City (Optional)"
              />
              <Input
                value={this.state.state}
                onChange={this.handleInputChange}
                name="state"
                placeholder="State (Optional)"
              />
              <Input
                value={this.state.zipcode}
                onChange={this.handleInputChange}
                name="zipcode"
                placeholder="Zipcode (Optional)"
              />
              <Input
                value={this.state.position_type}
                onChange={this.handleInputChange}
                name="position_type"
                placeholder="Position Type (required)"
              />
              <Input
                value={this.state.resume_url}
                onChange={this.handleInputChange}
                name="resume_url"
                placeholder="Resume URL (required)"
              />
              <TextArea
                value={this.state.resume_text}
                onChange={this.handleInputChange}
                name="resume_text"
                placeholder="Resume Text (Optional)"
              />
              <FormBtn
                disabled={!(this.state.firstname && this.state.lastname && this.state.email && this.state.position_type && this.state.resume_url)}
                onClick={this.handleFormSubmit}
              >
                Submit Candidate
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Candidates in Database</h1>
            </Jumbotron>
            {this.state.candidates.length ? (
              <List>
                {this.state.candidates.map(candidate => (
                  <ListItem key={candidate._id}>
                    <Link to={"/candidates/" + candidate._id}>
                      <strong>
                        {candidate.position_type}: {candidate.firstname} {candidate.lastname}
                      </strong>
                    </Link>
                    
                    <DeleteBtn onClick={() => this.deleteCandidate(candidate._id)} />
                    <ReviewBtn onClick={() => this.reviewCandidate(candidate._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Candidates Available</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Candidates;
