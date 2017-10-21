import React, { Component } from "react";
import ReviewBtn from "../../components/ReviewBtn";
import Jumbotron from "../../components/Jumbotron";
import Modal from "react-modal";
import managerAPI from "../../utils/managerAPI";
import jobreqAPI from "../../utils/jobreqAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
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


class MgrDetail extends Component {
  constructor(props) {
    super(props)
  this.state = {
    manager: {},
    jobreq: [],
    title: "",
    description: "",
    salary: "",
    reqskills: "",
    isOpen: false

  }
  this.toggleModal = this.toggleModal.bind(this);
  };

  componentDidMount() {
    console.log(this.props.match.params.id)
    managerAPI.getManager(this.props.match.params.id)
      .then(res => this.setState({ manager: res.data }))
      .catch(err => console.log(err));

    this.loadJobReqs(this.props.match.params.id);    
  
  };

  loadJobReqs = (id) => {
    jobreqAPI.getJobReqsbyMgr(id)
    .then(res =>
        this.setState({ jobreq: res.data, title: "", description: "", salary: "", reqskills: ""})
      )
      .catch(err => console.log(err));
  };

  deleteJobReq = id => {
    jobreqAPI.deletejobReq(id)
      .then(res => this.loadJobReqs(this.state.manager._id))
      .catch(err => console.log(err));
  };
  //function to set modal state for candidate review
  toggleModal = () => {
      this.setState({isOpen: !this.state.isOpen});
      
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.description && this.state.reqskills) {
      console.log("before save call");
      jobreqAPI.saveJobReq({
        title: this.state.title,
        description: this.state.description,
        salary: this.state.salary,
        reqskills: this.state.reqskills,
        mgrid: this.state.manager._id
      })
        .then(res => this.loadJobReqs(this.state.manager._id), this.toggleModal())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h2>
                Manager: {this.state.manager.fullname}
              </h2>
              <h2> 
                Email: {this.state.manager.email} 
              </h2>
              <h2> 
                Department: {this.state.manager.department}
              </h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <button onClick={this.toggleModal}>Create Job Profile</button>
          </Col>
        </Row>
        
        <Row>
          <Col size="md-12">
            <h2>Requisitions for Manager</h2>
            <Col size="md-12">
            <Modal isOpen={this.state.isOpen}
                  onRequestClose={this.toggleModal}
                  contentLabel="Input Job Profile"
                  style={customStyles}
                  >
                    <form>
                    <Input
                      value={this.state.title}
                      onChange={this.handleInputChange}
                      name="title"
                      placeholder="Title (required)"
                    />
                    <TextArea
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      name="description"
                      placeholder="Description (required)"
                    />
                    <Input
                      value={this.state.salary}
                      onChange={this.handleInputChange}
                      name="salary"
                      placeholder="Salary (optional)"
                    />
                    <Input
                      value={this.state.reqskills}
                      onChange={this.handleInputChange}
                      name="reqskills"
                      placeholder="Required Skills/Qualifications (required)"
                    />
                    <button onClick={
                      this.handleFormSubmit}>Save</button>
                    <button onClick={this.toggleModal}>Cancel</button>
                  </form>
               </Modal>   
            </Col>
               
            <Col size="md-12">
            
            {this.state.jobreq.length ? (
              <List>
              
                {this.state.jobreq.map(jobreq => (
                  <ListItem key={jobreq._id}>
                    <Link to={"/jobreq/" + jobreq._id}>
                      <strong>
                        {jobreq.title}: {jobreq.description}
                      </strong>
                    </Link>
                    
                    <ReviewBtn onClick={() => this.deleteJobReq(jobreq._id)} />
                  </ListItem>
                ))}
              </List>

            ) : (
              <h3>No Requisition on file</h3>
            )}
          </Col>
            
         </Col> 
        </Row>
      </Container>
    );
  }
}

export default MgrDetail;
