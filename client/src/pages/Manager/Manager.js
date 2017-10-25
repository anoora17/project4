import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import ReviewBtn from "../../components/ReviewBtn";
import Modal from "../../components/Modal";
// import Jumbotron from "../../components/Jumbotron";
import managerAPI from "../../utils/managerAPI";
import reviewAPI from "../../utils/reviewAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

import "./Manager.css"


class Managers extends Component {
  state = {
    managers: [],
    fullname: "",
    department: "",
    email: "",
    password: ""
    
    };

  componentDidMount() {
    this.loadManagers();
  }

  loadManagers = () => {
    managerAPI.getManagers()
      .then(res =>
        this.setState({ managers: res.data, fullname: "", department: "", email: "", password: ""})
      )
      .catch(err => console.log(err));
  };

  deleteManager = id => {
    managerAPI.deleteManager(id)
      .then(res => this.loadManagers())
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
    if (this.state.fullname && this.state.department && this.state.email && this.state.password) {
      managerAPI.saveManager({
        fullname: this.state.fullname,
        department: this.state.department,
        email: this.state.email,
        password: this.state.password
      })
        .then(res => this.loadManagers())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          
          <Col size="md-10">
            <div>
            <section className="manager">
              
              <h2>ACME Inc. Managers</h2>
            </section>
            </div>
            {this.state.managers.length ? (
              <div>
              <List>
                {this.state.managers.map(manager => (
                  
                  <ListItem key={manager._id}>
                    <Link to={"/managers/" + manager._id}>
                      <strong>
                        {manager.department}: {manager.fullname}
                      </strong>
                    </Link>
                    
                    <DeleteBtn  onClick={() => this.deleteManager(manager._id)} />
                    
                  </ListItem>
                ))}
              </List>
              </div>
            ) : (
              <h3>No Managers Available</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Managers;
