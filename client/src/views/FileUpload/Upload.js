import React, { Component } from "react";
import Dropzone from "./dropzone/Dropzone";
import DropzoneROS from "./dropzone/DropzoneROS";
import DropzoneYML from "./dropzone/DropzoneYML";
import Progress from "./progress/Progress";
import { Link } from "react-router-dom";
import logo from "../../assets/paracosm.png";
import device from "../../assets/px80.png";

import checkCircleOutline from "../../assets/checkCircleOutline.svg";
import "./Upload.css";
import { Grid, Row, Col } from "react-flexbox-grid";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      uuid: ""
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      var uuid = this.state.uuid;
      var name = uuid.concat("-", file.name);
      formData.append("file", file, name);
      console.log("filename", name);
      req.open("POST", "http://localhost:3000/upload");
      req.send(formData);
    });
  }
  changeHandler = event => {
    this.setState({
      uuid: event.target.value
    });
  };

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src={checkCircleOutline}
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0.5
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    // if (this.state.successfullUploaded) {
    //   return (
    //     <button
    //       onClick={() =>
    //         this.setState({ files: [], successfullUploaded: false })
    //       }
    //     >
    //       Clear
    //     </button>
    //   );
    // } else {
    //   return (
    //     <button
    //       disabled={this.state.files.length < 0 || this.state.uploading}
    //       onClick={this.uploadFiles}
    //     >
    //       Upload
    //     </button>
    //   );
    // }
  }

  render() {
    console.log("uuid", this.state.uuid);

    return (
      <div className="Upload">
        <div className="Actions">{this.renderActions()}</div>
        <a class="buttonLink">
          <Link to="/Login">
            <button class="logoutButton" type="button">
              Logout
            </button>
          </Link>
        </a>
        <a class="buttonDownload">
          <Link to="/Download">
            <button class="logoutButton" type="button">
              Download
            </button>
          </Link>
        </a>
        <span className="Title">Upload Files</span>
        <form>
          <input
            type="text"
            placeholder="Enter UUID"
            onChange={this.changeHandler}
          />
        </form>

        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
            <br></br>
            <DropzoneROS
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
            <br></br>
            <DropzoneYML
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
            <br></br>
            <br></br>

            <button onClick={this.uploadFiles} classname="Button">
              Submit Files
            </button>
          </div>

          <a
            className="Logo"
            target="_blank"
            rel="noopener noreferrer"
            href="https://paracosm.io"
          >
            <img className="px80" alt="" src={device} />
            <i
              className="fas fa-external-link-alt external-link"
              data-fa-transform="up-6"
            ></i>
          </a>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name}>
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
