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


class Reviews extends Component {
  state = {
    reviews: [],
    mgrName: "",
    mgrEmail: "",
    rating: "",
    comment: ""
    };

  componentDidMount() {
    this.loadReviews(id);
  }

  loadReivews = (id) => {
    reviewAPI.getReviews(id)
      .then(res =>
        this.setState({ reveiws: res.data, mgrName: "", mgrEmail: "", rating: "", comment: "" })
      )
      .catch(err => console.log(err));
  };

  deleteReview = id => {
    reviewAPI.deleteReview(id)
      .then(res => this.loadReviews())
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
    if (this.state.mgrName && this.state.mgrEmail && this.state.rating && this.state.comment) {
      reviewAPI.saveReview({
        mgrName: this.state.mgrName,
        mgrEmail: this.state.mgrEmail,
        rating: this.state.rating,
        comment: this.state.comment
      })
        .then(res => this.loadReivews())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Review Candidate</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.mgrName}
                onChange={this.handleInputChange}
                name="mgrName"
                placeholder="Manager Name (required)"
              />
              <Input
                value={this.state.mgrEmail}
                onChange={this.handleInputChange}
                name="mgrEmail"
                placeholder="Manager eMail (required)"
              />
              <Input
                value={this.state.rating}
                onChange={this.handleInputChange}
                name="rating"
                placeholder="Rating (required)"
              />
              
              <TextArea
                value={this.state.comment}
                onChange={this.handleInputChange}
                name="comment"
                placeholder="Comment (Optional)"
              />
              <FormBtn
                disabled={!(this.state.mgrName && this.state.mgrEmail && this.state.rating && this.state.comment)}
                onClick={this.handleFormSubmit}
              >
                Submit Review
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Reviews for Candidate</h1>
            </Jumbotron>
            {this.state.reviews.length ? (
              <List>
                {this.state.reviews.map(candidate => (
                  <ListItem key={candidate._id}>
                    <Link to={"/reviews/" + candidate._id}>
                      <strong>
                        {candidate.mgrName}: {candidate.rating}
                      </strong>
                    </Link>
                    
                    <DeleteBtn onClick={() => this.deleteReview(review._id)} />
                    
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Reviews in Database</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Reviews;
