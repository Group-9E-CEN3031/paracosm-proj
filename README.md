## Introduction

This project was created as part of CEN3031 (Introduction to Software Engineering) at the University of Florida. We worked with the client, Paracosm, in order to build out a web-app with their desired functionality in order to get real-world experience in our industry. It's goal is to be able to upload PX-80 calibration files, associated with a unique UUID, and to version them accordingly. The client also desired to have download capabilities, including a listing of the most recent files for each UUID. 

### Team Members

Max Barkow - Project Manager

Fernando Rivera - Scrum Master

David Espantoso - Dev Team

Matt Ionescu - Dev Team

Waddy Leonvil - Dev Team

### Hosting

The project is hosted [here](https://paracosm-project.herokuapp.com/) using Heroku, a cloud-based platform as a service. 

### Current Functionality

The team has been able to create working upload sections for each of the file types, and they are associated with the UUID provided, where it is then uploaded to an AWS bucket. The downloading functionality is not fully developed, but the skeleton of it is present in the deployed version, with static values populating the table for demo purposes.

## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components.
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README

## Available Scripts

In the project directory, you can run:

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.