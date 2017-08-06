import { DatabaseManager } from './managers/database-manager';
import { EmailManager } from './managers/email-manager';

// Imports
import express = require('express');
import path = require('path');
import http = require('http');
import bodyParser = require('body-parser');

// Get API route
const api = require('./routes/api');

// Server Express app
const app = express();

// Install managers
app.locals.databaseManager = new DatabaseManager();
// app.locals.emailManager = new EmailManager();

// Use json and urlencoded parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Declare static path to built client app
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

app.get('/verify', (req, res) => {
  console.log('GET to /verify');
  let manager = req.app.locals.databaseManager;
  let vid = req.query.vid;
  if (vid) {
    manager.verify(vid)
    .then((project) => {
      console.log("Verification successful!");
      res.redirect('/projects/' + project._id);
    })
    .catch((error) => {
      res.send(error);
    });
  } else {
    res.redirect('/');
  }
});

// Route all requests to Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Set server port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server with API running on localhost:${port}`);
});
