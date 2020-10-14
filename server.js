// Setup empty JS object to act as endpoint for all routes
const projectData = [];

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

// ---> Initialize the main project folder
app.use(express.static('website'));
// app.use(express.static('root'))

// Setup Server
const listening = (port) => {
    console.log(`Server listening on port ${port}`);
};
const server = app.listen(PORT, listening(PORT));


// --------------------------> ROUTES
// ---> GET ROUTE
const getRoute = (req, res) => {
    res.send(projectData);
};
app.get('/getWeatherData', getRoute);


// ---> POST ROUTE
const postRoute = (req, res) => {
    newEntry = {
        temperature: req.body.temperature,
        location: req.body.location,
        country: req.body.country,
        skyVisibility: req.body.skyVisibility,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    projectData.push(newEntry);
    res.send(projectData);
};
app.post('/addWeatherElement', postRoute);

/* ------------------------ END OF FILE ------------------------*/