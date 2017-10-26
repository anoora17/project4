import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import DelBtn from "../../components/DelBtn";
import ReviewBtn from "../../components/ReviewBtn";
import UploadBtn from "../../components/UploadBtn";
import Modal from "react-modal";
import candidateAPI from "../../utils/candidateAPI";
import reviewAPI from "../../utils/reviewAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./Candidate.css"
import { FormGroup, FormControl, ControlLabel,ListGroup  } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config"
import { invokeApig, s3Upload } from "../../libs/awsLib";

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
    SaveisOpen: false,
    //+++++++++++++++
    isLoading: null,    
      resume_url:"",
    resumes:[]

    // ++++++++++++++++++
    
    };
    this.toggleModal = this.toggleModal.bind(this);
    
  }

  componentDidMount() {
    // console.log(this.props.location.state.resume_url)
    this.loadCandidates()
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

  // uploadResume = id => {
    
  //   //This is where the new function needs to go
  //   //new function
  //   candidateAPI.getuploadeCandResume(id, "")
  //     .then(res => this.loadCandidates())
  //     .catch(err => console.log(err));
  // };
  async createResume(resume) {
  const {resume_url} = await invokeApig({
      path: "/resumes",
      method: "POST",
      body: resume
    });
    console.log(resume_url)
    candidateAPI.uploadeCandResume(resume_url)
    this.setState({resume_url:resume_url})
  }


  resumes() {
    return invokeApig({ path: "/resume" }).then(result =>{
      console.log(" Hellooooooooooo"+JSON.stringify(result))
    });

  }

  reviewCandidate = id => {
    //open modal form here
   

    reviewAPI.saveReview(id)
      .then(res => this.loadCandidates())
      .catch(err => console.log(err));

  };
   // ++++++++++++++++++

    handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

   handleFileChange = event => {
    this.file = event.target.files[0];
    console.log(this.file);

  }

    // ++++++++++++++++++
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

    handleSubmit = async event => {
    event.preventDefault();

    // if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
    //   alert("Please pick a file smaller than 5MB");
    //   return;
    // }

    this.setState({ isLoading: true });
    try {
      const uploadedFilename = this.file
        ? (await s3Upload(this.file)).Location
        : null;

      await this.createResume({
        content: this.state.content,
        attachment: uploadedFilename
      });

     // this.props.history.push("/candidate");
    } catch (e) {
      //alert(e);

   //   this.props.history.push("/");
      this.setState({ isLoading: false });

    }
  }
  render() {
    return (
      <Container fluid className="divTable">
      <Row>
        <Col size="md-12">
          <div>
            <h2>Candidates in Database</h2>
            <button className='btn-success' onClick={this.toggleModal}>New Candidate</button>
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
                  id: "resume_url",
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

        <Modal isOpen={this.state.SaveisOpen}
                  onRequestClose={this.toggleModal}
                  contentLabel="Save Successful"
                  style={customStyles}
                  >
                  <h2>Enter New Candidate</h2>
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
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="file">
             <ControlLabel>Attachment</ControlLabel>
                <FormControl onChange={this.handleFileChange} type="file" />
               </FormGroup>
                  <LoaderButton className="Resumebtn"
                    bsStyle ="info"
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Create"
                    loadingText="Creating…"
                    />          
           <ListGroup>
            {!this.state.isLoading && this.state.resume_url}
           </ListGroup>
        </form>

        <a href={this.state.resume_url}> Uploaded Document
        
        </a>
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
              
            <button className='btn-success' disabled={!(this.state.firstname && this.state.lastname && this.state.email && this.state.position_type && this.state.resume_url)}
                     onClick={
                      this.toggleModal,
                      this.handleFormSubmit}>Save</button>
            <button className='btn-danger' onClick={this.toggleModalReviewCand}>Cancel</button>
            </Col>
          </Row>
          </form>                                  
          </Modal>         

      </Container>
    );
  }
}

export default Candidates;
