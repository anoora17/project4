import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import DelBtn from "../../components/DelBtn";
import ReviewBtn from "../../components/ReviewBtn";
import UploadBtn from "../../components/UploadBtn";
import Jumbotron from "../../components/Jumbotron";
import Modal from "react-modal";
import candidateAPI from "../../utils/candidateAPI";
import reviewAPI from "../../utils/reviewAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import ReactTable from "react-table";
import "react-table/react-table.css";


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


class Candidates extends Component {
  constructor(props) {
    super(props)
  this.state = {
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
    resume_text: "",
    resume: "",
    SaveisOpen: false
    
    };
    this.toggleModal = this.toggleModal.bind(this);
    
  }

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

  uploadResume = id => {
    
    //This is where the new function needs to go
    //new function
    candidateAPI.getuploadeCandResume(id, "")
      .then(res => this.loadCandidates())
      .catch(err => console.log(err));
  };

  reviewCandidate = id => {
    //open modal form here
   

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

  //function to set modal state for save success
  toggleModal = () => {
      console.log(this.state.SaveisOpen);
      this.setState({SaveisOpen: !this.state.SaveisOpen});
      console.log(this.state.SaveisOpen);
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
        resume_text: this.state.resume_text,
        resume: this.state.resume_url
      })
        .then(res =>
          this.toggleModal(),
         this.loadCandidates())
        .catch(err => console.log(err));
        

    }
  };


  render() {
    return (
      <Container fluid>
      <Row>
        <div className="divTable">  
          <Col size="md-12">
            <h2>Candidates in Database</h2>
            
            <ReactTable
          data={this.state.candidates}
          noDataText="No Matches"
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstname"
                },
                {
                  Header: "Last Name",
                  id: "lastname",
                  accessor: d => d.lastname
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Position Type",
                  accessor: "position_type"
                },
                {
                  Header: "Email",
                  accessor: "email"
                },
                {
                  Header: "Resume",
                  accessor: "resume_url"

                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
  
                           
        </Col>
        </div>
        </Row>

         <Modal isOpen={this.state.SaveisOpen}
                  onRequestClose={this.toggleModal}
                  contentLabel="Save Successful"
                  style={customStyles}
                  >
                  <h2>Saved Candidate Data</h2>
                  <button className="btn btn-success" onClick={this.toggleModal}>close</button>
                  
          </Modal>

          <Row>
          <Col size="md-12">
            <h2>Enter New Candidate</h2>
          
          </Col>
        </Row>
        <form>
        <Row>
          <Col size="md-4">
              <Input
                value={this.state.firstname}
                onChange={this.handleInputChange}
                name="firstname"
                placeholder="Firstname (required)"
              />
          </Col>
          <Col size="md-4">
              <Input
                value={this.state.lastname}
                onChange={this.handleInputChange}
                name="lastname"
                placeholder="Lastname (required)"
              />
          </Col>
          <Col size="md-4">
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="Email (required)"
              />
            </Col>
        </Row>
        <Row>
            <Col size="md-4">
              <Input
                value={this.state.address}
                onChange={this.handleInputChange}
                name="address"
                placeholder="Address (Optional)"
              />
            </Col>
            <Col size="md-4">
              <Input
                value={this.state.city}
                onChange={this.handleInputChange}
                name="city"
                placeholder="City (Optional)"
              />
            </Col>
            <Col size="md-4">
              <Input
                value={this.state.state}
                onChange={this.handleInputChange}
                name="state"
                placeholder="State (Optional)"
              />
            </Col>
          </Row>
          <Row>
            <Col size="md-4">
              <Input
                value={this.state.zipcode}
                onChange={this.handleInputChange}
                name="zipcode"
                placeholder="Zipcode (Optional)"
              />
            </Col>
            <Col size="md-4">
              <Input
                value={this.state.position_type}
                onChange={this.handleInputChange}
                name="position_type"
                placeholder="Position Type (required)"
              />
            </Col>
            <Col size="md-4">
              <Input
                value={this.state.resume_url}
                onChange={this.handleInputChange}
                name="resume_url"
                placeholder="Resume URL (required)"
              />
            </Col>
          </Row>
          <Row>
             <Col size="md-12">
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
            
            </Col>
          </Row>
          </form>
          
      </Container>
    );
  }
}

export default Candidates;
