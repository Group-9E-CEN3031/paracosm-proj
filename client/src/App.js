import React from 'react';
import logo from './logo.svg';
import Component from 'react';

function App() {
  return (
    <div className="App">
      <div id="topBar">
        <p className="topText" id="topParacosm">
          Paracosm
        </p>
        <p className="topText" id="upload">
          Upload
        </p>
        <p className="topText" id="view">
          View
        </p>

      </div>
      <div id="midBar">
        <table id="midTable">
          <tr id="fileRow">
            <p id="files">
              The Files
            </p>
          </tr>
          <tr>
            <input type="text" placeholder="UUID Text Field" />
          </tr>
        </table>

        <div id="subDiv">
          <button id="subButton">
            Submit
          </button>
        </div>
      </div>
      <header className="App-header">
        <div className="pillar" id="leftDiv">
          <div className="subtitle">
            Image
          </div>
          <p>
            File and function description
          </p>

          <input type="file" name="file" id="real-file" hidden="hidden" onChange={(e)=>this.onChange(e)}/>
          <button type="button" id="testButton" className="fileButton">
            Choose a file...
          </button>
        </div>

        <div className="pillar" id="centerDiv">
          <div className="subtitle">
            YML
          </div>
          <p>
            File and function description
          </p>
          <button className="fileButton">
            Choose a file...
          </button>
        </div>

        <div className="pillar" id="rightDiv">
          <div className="subtitle">
            ROS
          </div>
          <p>
            File and function description
          </p>
          <button className="fileButton">
            Choose a file...
          </button>
        </div>
      </header>
    </div>
  );
}



export default App;
