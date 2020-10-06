// Setup empty JS object to act as endpoint for all routes
projectData = {};
const PORT = 8080;


// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


// --------------------------> ROUTES
// ---> GET ROUTE
const getRoute = (req, res) => {
    res.send(projectData);
    console.log(projectData);
};
app.get('/getWeatherData', getRoute);


// ---> POST ROUTE
const postRoute = (req, res) => {
    newEntry = {
        'temperature': req.body.temperature,
        'date': req.body.date,
        'userResponse': req.body.userResponse
    }
    projectData.push(newEntry);
    res.send(projectData);
    console.log(projectData);
};
app.post('/addWeatherElement', postRoute);