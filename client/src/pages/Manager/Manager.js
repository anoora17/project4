import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import ReviewBtn from "../../components/ReviewBtn";
import Modal from "../../components/Modal";
import Jumbotron from "../../components/Jumbotron";
import managerAPI from "../../utils/managerAPI";
import reviewAPI from "../../utils/reviewAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";


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
          <Col size="md-6">
            <Jumbotron>
              <h1>Enter New Manager</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.fullname}
                onChange={this.handleInputChange}
                name="fullname"
                placeholder="Name (required)"
              />
              <Input
                value={this.state.department}
                onChange={this.handleInputChange}
                name="department"
                placeholder="Department (required)"
              />
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="Email (required)"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="Password (required)"
              />
              <FormBtn
                disabled={!(this.state.fullname && this.state.department && this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Save Manager
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>ACME Inc. Managers</h1>
            </Jumbotron>
            {this.state.managers.length ? (
              <List>
                {this.state.managers.map(manager => (
                  <ListItem key={manager._id}>
                    <Link to={"/managers/" + manager._id}>
                      <strong>
                        {manager.department}: {manager.fullname}
                      </strong>
                    </Link>
                    
                    <DeleteBtn onClick={() => this.deleteManager(manager._id)} />
                    
                  </ListItem>
                ))}
              </List>
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
