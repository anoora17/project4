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
import "./Detail.css";
import {Button, CardBlock, Card, CardTitle,bsStyle
} from "react-bootstrap"
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
    reviews: [],
    rating: "",
    comment: "",
    reviewername: "",
    CandisOpen: false

  }
  this.toggleModalReviewCand = this.toggleModalReviewCand.bind(this);
  };
  
  componentDidMount() {
    candidateAPI.getCandidate(this.props.match.params.id)
      .then(res => this.setState({ candidate: res.data }))
      .catch(err => console.log(err));

    this.loadCandReviews(this.props.match.params.id);
  }

  loadCandReviews = (candid) => {
    reviewAPI.getReviewsbyCandidate(candid)
    .then(res =>
        this.setState({ reviews: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteReview = id => {
    reviewAPI.deleteReview(id)
      .then(res => this.loadCandReviews(this.state.candidate._id))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  //function to set modal state for candidate review
  toggleModalReviewCand = () => {
      this.setState({CandisOpen: !this.state.CandisOpen});
      
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.rating && this.state.comment && this.state.reviewername) {
      reviewAPI.saveReview({
        rating: this.state.rating,
        comment: this.state.comment,
        reviewername: this.state.reviewername,
        candid: this.state.candidate._id
      })
        .then(res =>
          this.toggleModalReviewCand(),
         this.loadCandReviews(this.state.candidate._id))
        .catch(err => console.log(err));
        

    }
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-4 md-offset-4">
            <div className="Card" >             
              <div className="CardBlock">
                <h4 className="CardTitle">Candidate Details</h4>
                <p className="CardText"><b> Name:</b> &nbsp; {this.state.candidate.firstname} &nbsp; {this.state.candidate.lastname}</p>
                <p className="CardText"><b>Position Type:</b> &nbsp;&nbsp;{this.state.candidate.position_type}</p>
                <p>
                 <a href={this.state.candidate.resume_url} ><Button className="carButton" bsSize="small"> View Resume</Button></a>           
                </p>        
              </div>
              <div>
              <hr/>
                  <h4>Resume Snippet</h4>
                  <p>
                   {this.state.candidate.resume_text}
                  </p>
                 <Button className="carButton" bsSize="small" onClick={this.toggleModalReviewCand}>Submit Review</Button>
              </div>
            </div>      
          </Col>
     </Row>
        <Row>
          <Col size="md-6 md-offset-1">
            
          </Col>
        </Row>
        <Modal isOpen={this.state.CandisOpen}
                  onRequestClose={this.toggleModalReviewCand}
                  contentLabel="Input Candidate Review"
                  style={customStyles}
                  >
                  <br/>
                  <h2>Review for Candidate:</h2>
                  <h2>{this.state.candidate.firstname} {this.state.candidate.lastname}</h2>
                  
                  <div>Enter Review Here</div>
                  <form>
                    <Input
                      value={this.state.reviewername}
                      onChange={this.handleInputChange}
                      name="reviewername"
                      placeholder="Your Name (required)"
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
                      placeholder="Comment (required)"
                    />
                    
                    <button onClick={
                      this.toggleModalReviewCand,
                      this.handleFormSubmit}>Save</button>
                    <button onClick={this.toggleModalReviewCand}>Cancel</button>
                  </form>
          </Modal>
        <Row>
          <Col size="md-8 md-offset-1">
            <br/>
            <br/>
            <h2>Reviews for Candidate</h2>            
            
            {this.state.reviews.length ? (
              <List>              
                {this.state.reviews.map(reviews => (
                  <ListItem key={reviews._id}>
                  <br/>
                    <Link to={"/review/" + reviews._id}>
                      
                     
                        <b>Rated: </b>{reviews.rating}&nbsp;&nbsp;<b>by:</b> {reviews.reviewername}&nbsp;&nbsp;<b> Comments: </b>{reviews.comment}
                       
                      
                    </Link>
                    
                    <DeleteBtn onClick={() => this.deleteReview(reviews._id)} />
                    <br/>
                  </ListItem>

                ))}
              </List>

            ) : (
              <h3>No Reviews on file</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
