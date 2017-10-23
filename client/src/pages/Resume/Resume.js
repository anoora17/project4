import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import "./Resume.css"
import $ from "jquery";



export default class Resume extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
    console.log(this.file);

  }



  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a file smaller than 5MB");
      return;
    }

    this.setState({ isLoading: true });
  }

  render() {
    return (
      <div className="Resume">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" className="resume-upload" />
          </FormGroup>
          <LoaderButton id="ajaxmessage" className="btn btn-sucess"
            bsStyle ="sucess"
            disabled={!this.validateForm()}
            bsSize="small"
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>

    );
  }
}

$(document).ready(function() {
  $('.LoaderButton').click(function() {
    var resumeText = $('input[class="resume-upload"]').prop('files')[0];
    console.log(resumeText);

    $.ajax({
        type: "POST",
        data: resumeText,
        url: "/resume",
        contentType: false,
        processData: false,
        success: function(response) {
            if(response) {
                $("#ajaxmessage").html("Your submission was successful!  Thank you for updating your public profile settings.");
                console.log(response);
            } else {
                $("#ajaxmessage").html("There was an error with your submission.");
            }
        }
    });
  });


});
