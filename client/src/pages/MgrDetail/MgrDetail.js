import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import DelBtn from "../../components/DelBtn";
import ReviewBtn from "../../components/ReviewBtn";
import UploadBtn from "../../components/UploadBtn";
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
    isOpen: false

  }
  this.toggleModal = this.toggleModal.bind(this);
  };

  componentDidMount() {
    
    
    managerAPI.getManager(this.props.match.params.id)
      .then(res => this.setState({ manager: res.data }))
      .catch(err => console.log(err));

    
  }

  deleteJobReq = id => {
    jobreqAPI.deletejobReq(id)
      .then(res => this.loadManagers())
      .catch(err => console.log(err));
  };
  //function to set modal state for candidate review
  toggleModal = () => {
      console.log(this.state.isOpen);
      this.setState({isOpen: !this.state.isOpen});
      console.log(this.state.isOpen);
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
            
          </Col>
        </Row>
        <Modal isOpen={this.state.isOpen}
                  onRequestClose={this.toggleModal}
                  contentLabel="Some modal text here"
                  style={customStyles}
                  >
                  <h2>Open Job Requisitions:</h2>
                  <h2>{this.state.fullname}</h2>
                  <button onClick={this.toggleModal}>Close</button>
                  <div>Enter Job Req Detail Here</div>
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
            <h2>Requisitions for Manager</h2>
            <Col size="md-12">
            
            {this.state.manager.length ? (
              <List>
              console.log({this.state.manager});
                {this.state.manager.map(jobreq => (
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
