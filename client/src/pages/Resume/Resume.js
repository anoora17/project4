import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import "./Resume.css"
import { invokeApig, s3Upload } from "../../libs/awsLib";

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
  
createResume(Resume) {
    return invokeApig({
      path: "/resume",
      method: "POST",
      body: Resume
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a file smaller than 5MB");
      return;
    }

    this.setState({ isLoading: true });
    try {
      const uploadedFilename = this.file
        ? (await s3Upload(this.file)).Location
        : null;

      await this.createResume({
        content: this.state.content,
        attachment: uploadedFilename
      });

      this.props.history.push("/candidates");
    } catch (e) {
      //alert(e);
      this.setState({ isLoading: false });
    }
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
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton className="btn btn-sucess"
            bsStyle ="sucess"       
            bsSize="small"
            disabled={!this.validateForm()}
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

//https://reactjs.org/docs/forms.html
// 1. Authenticate against our User Pool and acquire a user token.
// 2. With the user token get temporary IAM credentials from our Identity Pool.
// 3. Use the IAM credentials to sign our API request with Signature Version 4
// (http://docs.aws.amazon.com/general/latest/gr/signature-version-4.html).