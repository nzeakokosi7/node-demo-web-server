/*
 *This file contains the server logic
 *
 */ 

//Dependencies
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

//middleWares
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
  
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

app.use((req, res, next) => {
    res.render('maintainance.hbs');
  });

app.use(express.static(__dirname + '/public'));

//helpers
//returns currentYear
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//returns UpperCase version of string argument
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//Get request for the root directory and render the home page
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

//Get request for the /about directory and render the about page
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

//Allow the server to run on port 3000
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});