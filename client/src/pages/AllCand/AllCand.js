import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import DelBtn from "../../components/DelBtn";
import ReviewBtn from "../../components/ReviewBtn";
import Modal from "../../components/Modal";
import Jumbotron from "../../components/Jumbotron";
import candidateAPI from "../../utils/candidateAPI";
import reviewAPI from "../../utils/reviewAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import ReactTable from "react-table";
import "react-table/react-table.css";



class AllCandidates extends Component {
  state = {
    candidates: [],
    resume_text: ""
   
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
    if (this.state.resume_text) {
      console.log(this.state.resume_text);
        candidateAPI.textsearchCandidate(this.state.resume_text)
        .then(res =>
        this.setState({ candidates: res.data, resume_text: "" })
      )
      .catch(err => console.log(err));
    }

  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
           <div> 
              <h2>Search the Candidate Repo</h2>
           
            <form>
              
              <Input
                value={this.state.resume_text}
                onChange={this.handleInputChange}
                name="resume_text"
                placeholder="Enter Text to Search"
              />
              
             
              <FormBtn
                disabled={!(this.state.resume_text)}
                onClick={this.handleFormSubmit}
              >
                Search Candidates
              </FormBtn>
            </form>
            </div>
          </Col>
          </Row>
          
        <Row>
          <Col size="md-12">
            <div className="divTable">
          <ReactTable  
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                onClick: (e, handleOriginal) => {
                  document.location = '/candidates/' + instance.state.data[rowInfo.index]._id;
                  console.log('A Td Element was clicked!')
                  console.log('it produced this event:', e)
                  console.log('It was in this column:', column)
                  console.log('It was in this row:', rowInfo)

                  console.log('It was in this table instance:', instance)
 
        // IMPORTANT! React-Table uses onClick internally to trigger
        // events like expanding SubComponents and pivots.
        // By default a custom 'onClick' handler will override this functionality.
        // If you want to fire the original onClick handler, call the
        // 'handleOriginal' function.
                if (handleOriginal) {
                  handleOriginal()
                  console.log(instance.state.data[rowInfo.index]._id);

                }
                

                
              }
            }
          }} 
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
  
         </div>             
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AllCandidates;
